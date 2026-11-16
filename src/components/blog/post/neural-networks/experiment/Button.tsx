type ButtonProps = { text: string; onClick: () => void; disabled?: boolean }

export default function Button({ text, onClick, disabled = false }: ButtonProps) {
  return (
    <button
      className="rounded-md bg-neutral-600 px-2 py-0.5 text-neutral-0 duration-200 hover:enabled:bg-neutral-400 disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
