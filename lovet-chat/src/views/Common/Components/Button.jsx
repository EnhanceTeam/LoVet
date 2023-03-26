export function FilledButton({ href = "#", label = "Button" }) {
  return (
    <a
      href={href}
      className="flex bg-primary-container hover:bg-yellow-200 rounded-full px-8 py-2 transition"
    >
      {label}
    </a>
  )
}
