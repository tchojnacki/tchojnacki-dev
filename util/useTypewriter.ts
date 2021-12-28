import React from 'react'

interface TypewriterDelays {
  type: number
  beforeTyping: number
  beforeErasing: number
}

interface TypewriterTransition {
  changeTo: string
  afterDelay: number
}

function* textStates(
  texts: string[],
  delays: TypewriterDelays
): Generator<TypewriterTransition, never, unknown> {
  let textIdx = 0

  const yieldStep = (i: number, delay: number) => {
    return {
      changeTo: texts[textIdx].slice(0, i),
      afterDelay: delay,
    }
  }

  while (true) {
    yield yieldStep(-1, delays.beforeErasing)

    for (let i = texts[textIdx].length - 2; i >= 0; i--) {
      yield yieldStep(i, delays.type)
    }

    textIdx = (textIdx + 1) % texts.length

    yield yieldStep(1, delays.beforeTyping)

    for (let i = 2; i <= texts[textIdx].length; i++) {
      yield yieldStep(i, delays.type)
    }
  }
}

export function useTypewriter(texts: string[], delays: TypewriterDelays) {
  const [currentText, setCurrentText] = React.useState(texts[0])

  const generatorRef = React.useRef(textStates(texts, delays))

  React.useEffect(() => {
    const nextStage = generatorRef.current.next().value

    const timeoutId = setTimeout(() => setCurrentText(nextStage.changeTo), nextStage.afterDelay)

    return () => clearTimeout(timeoutId)
  }, [currentText])

  return currentText
}
