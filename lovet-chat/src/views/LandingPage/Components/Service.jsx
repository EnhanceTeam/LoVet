import { FilledButton } from "../../Common/Components/Button"

export default function Service() {
  return (
    <section id="service" className="flex relative z-0 h-[80vh]">
      <img src="assets/images/veterinarian_cat.webp" alt="Veterinarian holding cat" className="w-full object-cover object-top" />
      <img src="assets/images/veterinarian_dog.webp" alt="Veterinarian holding dog" className="hidden md:block w-full object-cover" />
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-y-8 p-12 z-10">
        <div className="flex justify-center text-center">
          <h1 className="text-white max-w-2xl">
            Segera konsultasikan anabul kesayangan Anda sebelum terlambat
          </h1>
        </div>
        <div className="flex justify-center">
          <FilledButton href="#" label="Jadwalkan Konsultasi" />
        </div>
      </div>
    </section>
  )
}
