import { Fragment, useRef, useState, type PropsWithChildren } from 'react'
import ObjectTree from '~/components/blog/ObjectTree'
import PromptBlock from '~/components/blog/PromptBlock'
import { lerp } from '~/lib/math'
import { cpuBoundLoop } from '~/lib/perf'
import Button from './Button'
import DiffCanvases from './DiffCanvases'
import { Network } from './domain'
import LossFigure from './LossFigure'
import {
  batchOptions,
  defaultBatch,
  defaultEta,
  defaultLayer,
  etaOptions,
  layerOptions,
} from './params'
import Select from './Select'

export default function Experiment({ children }: PropsWithChildren) {
  const [layers, setLayers] = useState(defaultLayer)
  const [batch, setBatch] = useState(defaultBatch)
  const [eta, setEta] = useState(defaultEta)

  const [losses, setLosses] = useState<number[]>([])
  const [progress, setProgress] = useState<number | null>(null)

  const modelRef = useRef(new Network(2, layers))

  const disabled = progress !== null

  const run = (times: number) => {
    setProgress(0)
    cpuBoundLoop(times, async t => {
      const X = []
      const y = []
      for (let i = 0; i < batch; i++) {
        const x0 = lerp(Math.random(), [0, 1], [-1, 1])
        const x1 = lerp(Math.random(), [0, 1], [-1, 1])
        X.push([x0, x1])
        y.push(Math.sqrt(x0 * x0 + x1 * x1) - 0.5)
      }
      const loss = modelRef.current.fit(X, y, eta)
      setLosses(l => [...l, loss])
      setProgress(lerp(t + 1, [0, times], [0, 1]))
    }).then(() => setProgress(null))
  }

  const reset = () => {
    modelRef.current = new Network(2, layers)
    setLosses([])
    setProgress(null)
  }

  return (
    <figure>
      <PromptBlock>
        const model = new Network(2,{' '}
        <Select
          options={layerOptions}
          current={layers}
          setCurrent={l => setLayers(l)}
          serialize={JSON.stringify}
          deserialize={JSON.parse}
          display={l => `[${l.join(', ')}]`}
          onChange={l => {
            modelRef.current = new Network(2, l)
            setLosses([])
          }}
          disabled={disabled}
        />
        ); <br className="mb-2 sm:hidden" />
        <Button text="RESET" onClick={reset} disabled={disabled} />
      </PromptBlock>
      <ObjectTree name="model" value={modelRef.current} />
      {children}
      <PromptBlock>
        learn(
        <Select
          options={batchOptions}
          current={batch}
          setCurrent={setBatch}
          serialize={String}
          deserialize={parseInt}
          disabled={disabled}
        />
        ,{' '}
        <Select
          options={etaOptions}
          current={eta}
          setCurrent={setEta}
          serialize={e => e.toFixed(3)}
          deserialize={parseFloat}
          display={String}
          disabled={disabled}
        />
        );
        <br className="mb-2 sm:hidden" />
        {[1, 10, 100].map(n => (
          <Fragment key={n}>
            {' '}
            <Button text={`RUN x${n}`} onClick={() => run(n)} disabled={disabled} />
          </Fragment>
        ))}
      </PromptBlock>
      <progress value={progress ?? 1} max={1} className="w-full rounded-md" />
      <div className="my-2 grid grid-cols-2 gap-4 *:w-full sm:grid-cols-4 sm:gap-2">
        <DiffCanvases model={modelRef.current} losses={losses} />
        <LossFigure losses={losses} />
      </div>
    </figure>
  )
}
