export default function NavItem({ href, label }) {
  return (
    <li>
      <a href={href} className="h-full px-4 py-2 ml-1 hover:text-white hover:bg-neutral-800 rounded-full transition">{label}</a>
    </li>
  )
}
