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
  $propagate: () => void = () => {}

  constructor(value: number) {
    this.value = value
  }

  static #op(children: Scalar[], value: number, propagate: (out: Scalar) => void): Scalar {
    const out = new Scalar(value)
    out.$children = children
    out.$propagate = () => propagate(out)
    return out
  }

  add(other: Scalar): Scalar {
    return Scalar.#op([this, other], this.value + other.value, out => {
      this.partial += out.partial
      other.partial += out.partial
    })
  }

  mul(other: Scalar): Scalar {
    return Scalar.#op([this, other], this.value * other.value, out => {
      this.partial += other.value * out.partial
      other.partial += this.value * out.partial
    })
  }

  pow(n: number): Scalar {
    return Scalar.#op([this], this.value ** n, out => {
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

const x = new Scalar(1)
const numerator = new Scalar(2).mul(x).sub(new Scalar(3))
const denominator = x.pow(3).add(x.pow(2)).sub(x)
const f = numerator.div(denominator)
f.derive()

export default function RationalExprExample() {
  return <ObjectTree name={null} value={f} />
}
