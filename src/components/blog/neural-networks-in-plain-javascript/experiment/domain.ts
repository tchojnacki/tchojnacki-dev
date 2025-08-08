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
  static name = "Scalar"
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

export abstract class Model {
  static name = "Model"
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
  static override name = "Neuron"
  $w: Scalar[]
  $b: Scalar
  $activation: "linear" | "relu"

  constructor(inputCount: number, activation: "linear" | "relu" = "relu") {
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
  static name = "Layer"
  $neurons: Neuron[]

  constructor(inputCount: number, outputCount: number, activation: "linear" | "relu") {
    this.$neurons = Array.from({ length: outputCount }, () => new Neuron(inputCount, activation))
  }

  get parameters(): Scalar[] {
    return this.$neurons.flatMap(n => n.parameters)
  }

  evaluate(x: Scalar[]): Scalar[] {
    return this.$neurons.map(n => n.evaluate(x))
  }
}

export class Network extends Model {
  static override name = "Network"
  $layers: Layer[]

  constructor(inputCount: number, layers: number[] = []) {
    super()
    const sizes = [inputCount, ...layers]
    this.$layers = [
      ...layers.map((_, i) => new Layer(sizes[i]!, sizes[i + 1]!, "relu")),
      new Layer(sizes[sizes.length - 1]!, 1, "linear"),
    ]
  }

  get parameters(): Scalar[] {
    return this.$layers.flatMap(l => l.parameters)
  }

  evaluate(x: Scalar[]): Scalar {
    return this.$layers.reduce((acc, l) => l.evaluate(acc), x)[0]!
  }
}
