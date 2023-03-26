export default function ReasonItem({ icon, alt, title, description }) {
  return (
    <div className="flex flex-col text-center gap-y-6 p-6 md:p-0">
      <img src={icon} alt={alt} className="object-contain h-20" />
      <h2 className="md:h-16 lg:h-min">{title}</h2>
      <p>{description}</p>
    </div>
  )
}
