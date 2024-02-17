import ObjectTree from '~/components/blog/ObjectTree'

function topologicalSort<Node>(start: Node, neighbors: (node: Node) => Node[]): Node[] {
  const acc: Node[] = []
  const visited = new Set<Node>()

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
  $propagate: () => void = () => {}

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

  $loss(X: number[][], y: number[]) {
    const inputs = Scalar.wrap(X)
    const outputs = Scalar.wrap(y)
    const guesses = inputs.map(x => this.evaluate(x))
    const errors = guesses.map((g, i) => g.sub(outputs[i]!).pow(2))
    return Scalar.sum(errors).div(new Scalar(errors.length))
  }

  fit(X: number[][], y: number[], eta: number): number {
    const loss = this.$loss(X, y)

    loss.derive()

    for (const p of this.parameters) {
      p.value -= eta * p.partial
    }

    return loss.value
  }
}

class Linear extends Model {
  static override name = 'Linear'
  $a: Scalar
  $b: Scalar

  constructor() {
    super()
    this.$a = new Scalar(0)
    this.$b = new Scalar(0)
  }

  override get parameters() {
    return [this.$a, this.$b]
  }

  override evaluate(x: Scalar[]) {
    return this.$a.mul(x[0]!).add(this.$b)
  }
}

const linear = new Linear()
const X = [[3.1], [-0.1], [4], [-2.1]]
const y = [-0.6, -1.9, 0, -3]
for (let k = 0; k < 100; k++) {
  linear.fit(X, y, 0.1)
}

export default function LinearExample() {
  return <ObjectTree name="linear" value={linear} />
}
