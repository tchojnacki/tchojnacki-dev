import { useEffect, useRef } from 'react'
import { lerp } from '~/utils/math'
import type { Model } from './domain'

type DiffCanvasesProps = { model: Model; losses: number[] }

export default function DiffCanvases({ model, losses }: DiffCanvasesProps) {
  const realCanvasRef = useRef<HTMLCanvasElement>(null)
  const predCanvasRef = useRef<HTMLCanvasElement>(null)
  const lossCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const realCtx = realCanvasRef.current!.getContext('2d')!
    const predCtx = predCanvasRef.current!.getContext('2d')!
    const lossCtx = lossCanvasRef.current!.getContext('2d')!

    for (let px = 0; px < 100; px++) {
      for (let py = 0; py < 100; py++) {
        const x1 = lerp(px + 0.5, [0, 100], [-1, 1])
        const x2 = lerp(py + 0.5, [0, 100], [-1, 1])

        const real = Math.sqrt(x1 ** 2 + x2 ** 2) - 0.5
        const pred = model.predict([x1, x2])
        const loss = Math.abs(real - pred)

        realCtx.fillStyle = `hsl(0  0% ${lerp(real, [-0.5, 0.5], [100, 0])}%)`
        realCtx.fillRect(px, py, 1, 1)

        predCtx.fillStyle = `hsl(0  0% ${lerp(pred, [-0.5, 0.5], [100, 0])}%)`
        predCtx.fillRect(px, py, 1, 1)

        lossCtx.fillStyle = `rgb(${lerp(loss, [0, 1], [0, 255])}, ${lerp(loss, [0, 1], [255, 0])}, 0)`
        lossCtx.fillRect(px, py, 1, 1)
      }
    }
  }, [model, losses])

  return (
    <>
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
    </>
  )
}
