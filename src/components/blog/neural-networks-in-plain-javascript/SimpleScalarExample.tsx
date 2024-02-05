import ObjectTree from './ObjectTree'

class Scalar {
  value: number
  $children: Scalar[] = []

  constructor(value: number) {
    this.value = value
  }

  add(other: Scalar) {
    const out = new Scalar(this.value + other.value)
    out.$children = [this, other]
    return out
  }

  mul(other: Scalar) {
    const out = new Scalar(this.value * other.value)
    out.$children = [this, other]
    return out
  }
}

const x = new Scalar(3)
const y = new Scalar(4)
const z = new Scalar(5)
const result = x.add(y).mul(z)

export default function SimpleScalarExample() {
  return <ObjectTree name={null} value={result} />
}
