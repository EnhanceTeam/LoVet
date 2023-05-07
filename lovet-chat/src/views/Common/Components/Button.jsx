export function FilledButton({ label = "Button", ...rootDOMAttributes }) {
  return (
    <button
      className="flex justify-center bg-primary-container hover:bg-yellow-200 rounded-full px-8 py-2 transition"
      {...rootDOMAttributes}
    >
      {label}
    </button>
  )
}
