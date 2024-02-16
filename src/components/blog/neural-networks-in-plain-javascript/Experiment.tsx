import { useRef, useState, type PropsWithChildren, useEffect } from 'react'
import ObjectTree from './ObjectTree'

function topologicalSort<Node>(start: Node, neighbors: (node: Node) => Node[]): Node[] {
  const acc: Node[] = []

  const visited: Set<Node> = new Set()

  const visit = (n: Node) => {
    if (visited.has(n)) {
      return
    }
    visited.add(n)
    for (const c of neighbors(n)) {
      visit(c)
    }
    acc.push(n)
  }

  visit(start)
  return acc.reverse()
}

class Scalar {
  static name = 'Scalar'
  value: number
  partial: number = 0
  $children: this[] = []
  $propagate: () => void = (): void => {}

  constructor(value: number) {
    this.value = value
  }

  static wrap(numbers: number[]): Scalar[]
  static wrap(numbers: number[][]): Scalar[][]
  static wrap(numbers: number[] | number[][]): (Scalar | Scalar[])[] {
    return numbers.map(n => (Array.isArray(n) ? Scalar.wrap(n) : new Scalar(n)))
  }

  static $op(children: Scalar[], value: number, propagate: (out: Scalar) => void): Scalar {
    const out = new Scalar(value)
    out.$children = children
    out.$propagate = () => propagate(out)
    return out
  }

  static sum(scalars: Scalar[]): Scalar {
    return Scalar.$op(
      scalars,
      scalars.reduce((acc, s) => acc + s.value, 0),
      out =>
        scalars.forEach(s => {
          s.partial += out.partial
        }),
    )
  }

  add(other: Scalar): Scalar {
    return Scalar.sum([this, other])
  }

  mul(other: Scalar): Scalar {
    return Scalar.$op([this, other], this.value * other.value, out => {
      this.partial += other.value * out.partial
      other.partial += this.value * out.partial
    })
  }

  pow(n: number): Scalar {
    return Scalar.$op([this], this.value ** n, out => {
      this.partial += n * this.value ** (n - 1) * out.partial
    })
  }

  sub(other: Scalar): Scalar {
    return this.add(other.mul(new Scalar(-1)))
  }

  div(other: Scalar): Scalar {
    return this.mul(other.pow(-1))
  }

  linear(): Scalar {
    return this
  }

  relu(): Scalar {
    return Scalar.$op([this], this.value < 0 ? 0 : this.value, out => {
      this.partial += out.value > 0 ? out.partial : 0
    })
  }

  derive() {
    const order = topologicalSort(this, s => s.$children)

    for (const s of order) {
      s.partial = 0
    }

    this.partial = 1

    for (const s of order) {
      s.$propagate()
    }
  }
}

abstract class Model {
  static name = 'Model'
  abstract get parameters(): Scalar[]
  abstract evaluate(x: Scalar[]): Scalar

  $loss(X: number[][], y: number[]): Scalar {
    const inputs = Scalar.wrap(X)
    const outputs = Scalar.wrap(y)
    const guesses = inputs.map(x => this.evaluate(x))
    const errors = guesses.map((g, i) => g.sub(outputs[i]!).pow(2))
    const l2 = Scalar.sum(this.parameters.map(p => p.pow(2)))
      .div(new Scalar(this.parameters.length))
      .mul(new Scalar(0.001))
    return Scalar.sum(errors).div(new Scalar(errors.length)).add(l2)
  }

  fit(X: number[][], y: number[], eta: number): number {
    const loss = this.$loss(X, y)

    loss.derive()

    for (const p of this.parameters) {
      p.value -= eta * p.partial
    }

    return loss.value
  }

  predict(x: number[]) {
    return this.evaluate(Scalar.wrap(x)).value
  }
}

class Neuron extends Model {
  static override name = 'Neuron'
  $w: Scalar[]
  $b: Scalar
  $activation: 'linear' | 'relu'

  constructor(inputCount: number, activation: 'linear' | 'relu' = 'relu') {
    super()
    this.$w = Array.from({ length: inputCount }, () => new Scalar(Math.random() * 2 - 1))
    this.$b = new Scalar(0)
    this.$activation = activation
  }

  get parameters(): Scalar[] {
    return [...this.$w, this.$b]
  }

  evaluate(x: Scalar[]): Scalar {
    return Scalar.sum(this.$w.map((wi, i) => wi.mul(x[i]!)))
      .add(this.$b)
      [this.$activation]()
  }
}

class Layer {
  static name = 'Layer'
  $neurons: Neuron[]

  constructor(inputCount: number, outputCount: number, activation: 'linear' | 'relu') {
    this.$neurons = Array.from({ length: outputCount }, () => new Neuron(inputCount, activation))
  }

  get parameters(): Scalar[] {
    return this.$neurons.flatMap(n => n.parameters)
  }

  evaluate(x: Scalar[]): Scalar[] {
    return this.$neurons.map(n => n.evaluate(x))
  }
}

class Network extends Model {
  static override name = 'Network'
  $layers: Layer[]

  constructor(inputCount: number, layers: number[] = []) {
    super()
    const sizes = [inputCount, ...layers]
    this.$layers = [
      ...layers.map((_, i) => new Layer(sizes[i]!, sizes[i + 1]!, 'relu')),
      new Layer(sizes[sizes.length - 1]!, 1, 'linear'),
    ]
  }

  get parameters(): Scalar[] {
    return this.$layers.flatMap(l => l.parameters)
  }

  evaluate(x: Scalar[]): Scalar {
    return this.$layers.reduce((acc, l) => l.evaluate(acc), x)[0]!
  }
}

const LAYER_OPTIONS = [
  [],
  [2],
  [32],
  [4, 4],
  [16, 16],
  [8, 8, 8],
  [4, 32, 4],
  [8, 16, 16, 8],
  [8, 8, 8, 8, 8],
]
const DEFAULT_LAYER = 5

const BATCH_OPTIONS = [1, 10, 100, 1000, 10000]
const DEFAULT_BATCH = 2

const ETA_OPTIONS = [0.001, 0.01, 0.1, 1]
const DEFAULT_ETA = 1

const SELECT_CLASS = 'rounded-md bg-neutral-600 px-2 py-0.5 text-neutral-0 disabled:opacity-50'
const BUTTON_CLASS =
  'rounded-md bg-neutral-600 px-2 py-0.5 text-neutral-0 duration-200 hover:enabled:bg-neutral-400 disabled:opacity-50'

function Block({ children }: PropsWithChildren) {
  return (
    <pre className="my-2 flex overflow-x-auto rounded-md bg-[#24292e] p-1 font-mono text-neutral-200">
      <div className="select-none text-indigo-300">&gt; </div>
      <div>{children}</div>
    </pre>
  )
}

export default function Experiment({ children }: PropsWithChildren) {
  const [layers, setLayers] = useState(LAYER_OPTIONS[DEFAULT_LAYER]!)
  const [batch, setBatch] = useState(BATCH_OPTIONS[DEFAULT_BATCH]!)
  const [eta, setEta] = useState(ETA_OPTIONS[DEFAULT_ETA]!)
  const [losses, setLosses] = useState<number[]>([])
  const [progress, setProgress] = useState<number | null>(null)

  const modelRef = useRef(new Network(2, layers))

  const realCanvasRef = useRef<HTMLCanvasElement>(null)
  const predCanvasRef = useRef<HTMLCanvasElement>(null)
  const lossCanvasRef = useRef<HTMLCanvasElement>(null)

  const run = (times: number) => {
    setProgress(0)

    const loop = (t: number) => {
      if (t >= times) {
        setProgress(null)
        return
      }

      const X = []
      const y = []
      for (let i = 0; i < batch; i++) {
        const x0 = Math.random() * 2 - 1
        const x1 = Math.random() * 2 - 1
        X.push([x0, x1])
        y.push(Math.sqrt(x0 * x0 + x1 * x1) - 0.5)
      }
      const loss = modelRef.current.fit(X, y, eta)
      setLosses(l => [...l, loss])
      setProgress((t + 1) / times)

      setTimeout(() => loop(t + 1), 0)
    }

    setTimeout(() => loop(0), 0)
  }

  const reset = () => {
    modelRef.current = new Network(2, layers)
    setLosses([])
    setProgress(null)
  }

  useEffect(() => {
    const realCtx = realCanvasRef.current!.getContext('2d')!
    const predCtx = predCanvasRef.current!.getContext('2d')!
    const lossCtx = lossCanvasRef.current!.getContext('2d')!

    for (let px = 0; px < 100; px++) {
      for (let py = 0; py < 100; py++) {
        const x1 = (px + 0.5) / 50 - 1
        const x2 = (py + 0.5) / 50 - 1

        const real = Math.sqrt(x1 ** 2 + x2 ** 2) - 0.5
        realCtx.fillStyle = `hsl(0  0% ${(0.5 - real) * 100}%)`
        realCtx.fillRect(px, py, 1, 1)

        const pred = modelRef.current.predict([x1, x2])
        predCtx.fillStyle = `hsl(0  0% ${(0.5 - pred) * 100}%)`
        predCtx.fillRect(px, py, 1, 1)

        const loss = Math.abs(real - pred)
        lossCtx.fillStyle = `rgb(${loss * 255}, ${(1 - loss) * 255}, 0)`
        lossCtx.fillRect(px, py, 1, 1)
      }
    }
  }, [losses])

  return (
    <figure>
      <Block>
        const model = new Network(2,{' '}
        <select
          className={SELECT_CLASS}
          autoComplete="off"
          value={JSON.stringify(layers)}
          onChange={e => {
            const value = JSON.parse(e.target.value)
            modelRef.current = new Network(2, value)
            setLayers(value)
            setLosses([])
          }}
          disabled={progress !== null}
        >
          {LAYER_OPTIONS.map(l => (
            <option key={JSON.stringify(l)} value={JSON.stringify(l)}>
              [{l.join(', ')}]
            </option>
          ))}
        </select>
        ); <br className="sm:hidden" />
        <button className={BUTTON_CLASS} onClick={reset} disabled={progress !== null}>
          RESET
        </button>
      </Block>
      <ObjectTree name="model" value={modelRef.current} />
      {children}
      <Block>
        learn(
        <select
          className={SELECT_CLASS}
          autoComplete="off"
          value={batch.toString()}
          onChange={e => setBatch(parseInt(e.target.value, 10))}
          disabled={progress !== null}
        >
          {BATCH_OPTIONS.map(b => (
            <option key={b} value={b.toString()}>
              {b}
            </option>
          ))}
        </select>
        ,{' '}
        <select
          className={SELECT_CLASS}
          autoComplete="off"
          value={eta!.toFixed(3)}
          onChange={e => setEta(parseFloat(e.target.value))}
          disabled={progress !== null}
        >
          {ETA_OPTIONS.map(e => (
            <option key={e.toFixed(3)} value={e.toFixed(3)}>
              {e}
            </option>
          ))}
        </select>
        ); <br className="sm:hidden" />
        <button className={BUTTON_CLASS} onClick={() => run(1)} disabled={progress !== null}>
          RUN x1
        </button>{' '}
        <button className={BUTTON_CLASS} onClick={() => run(10)} disabled={progress !== null}>
          RUN x10
        </button>{' '}
        <button className={BUTTON_CLASS} onClick={() => run(100)} disabled={progress !== null}>
          RUN x100
        </button>
      </Block>
      <progress value={progress ?? 1} max={1} className="w-full" />
      <div className="my-2 grid grid-cols-2 gap-4 *:w-full sm:grid-cols-4 sm:gap-2">
        <figure>
          <canvas width="100" height="100" className="w-full" ref={realCanvasRef} />
          <figcaption className="text-center">Real</figcaption>
        </figure>
        <figure>
          <canvas width="100" height="100" className="w-full" ref={predCanvasRef} />
          <figcaption className="text-center">Predicted</figcaption>
        </figure>
        <figure>
          <canvas width="100" height="100" className="w-full" ref={lossCanvasRef} />
          <figcaption className="text-center">Difference</figcaption>
        </figure>
        <figure>
          <svg viewBox="0 0 1 1" className="bg-[#EEEEEE] dark:bg-[#222222]">
            <path
              d={`M ${losses.map((l1, i) => `${i / (losses.length - 1)} ${1 - Math.min(l1, 1) / Math.max(...losses.map(l2 => Math.min(l2, 1)))}`).join(' L ')}`}
              strokeWidth="0.01"
              className="fill-none stroke-[#FE5B1F]"
            />
            <path
              d="M 0 0 L 0 1 L 1 1"
              strokeWidth="0.02"
              className="fill-none stroke-[#555555] dark:stroke-[#666666]"
            />
          </svg>
          <figcaption className="text-center">
            Loss{losses.length > 0 ? ` = ${losses.at(-1)!.toFixed(5)}` : null}
          </figcaption>
        </figure>
      </div>
    </figure>
  )
}
