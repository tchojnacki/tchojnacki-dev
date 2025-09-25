import type { ComponentProps } from "react"

import Link from "~/components/common/Link"

function H1({ children, id }: ComponentProps<"h1">) {
  return (
    <h2 id={id} className="text-neutral-1000 dark:text-neutral-0 mt-6 mb-1.5 text-2xl font-bold">
      <a href={`#${id}`}>{children}</a>
    </h2>
  )
}

function H2({ children, id }: ComponentProps<"h2">) {
  return (
    <h3 id={id} className="text-neutral-1000 dark:text-neutral-0 mt-5 mb-1.5 text-xl font-bold">
      <a href={`#${id}`}>{children}</a>
    </h3>
  )
}

function H3({ children, id }: ComponentProps<"h3">) {
  return (
    <h4 id={id} className="text-neutral-1000 dark:text-neutral-0 mt-4 mb-1.5 text-lg font-bold">
      <a href={`#${id}`}>{children}</a>
    </h4>
  )
}

function H4({ children, id }: ComponentProps<"h4">) {
  return (
    <h5 id={id} className="text-neutral-1000 dark:text-neutral-0 mt-3 mb-1.5 text-base font-bold">
      <a href={`#${id}`}>{children}</a>
    </h5>
  )
}

function P({ children }: ComponentProps<"p">) {
  return <p className="my-1.5 text-justify">{children}</p>
}

function Code({ children }: ComponentProps<"code">) {
  return (
    <code className="bg-ghl-background outline-ghl-border dark:bg-ghd-background dark:outline-ghd-border -my-0.5 rounded-md px-1 py-0.5 outline-1">
      {children}
    </code>
  )
}

function Blockquote({ children }: ComponentProps<"blockquote">) {
  return (
    <blockquote className="my-2 border-l-4 border-l-sky-500 px-4 py-1 italic">
      {children}
    </blockquote>
  )
}

function Ul({ children }: ComponentProps<"ul">) {
  return <ul className="list-disc pl-4 text-justify *:my-1.5">{children}</ul>
}

export const typography = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  a: Link,
  code: Code,
  blockquote: Blockquote,
  ul: Ul,
}
