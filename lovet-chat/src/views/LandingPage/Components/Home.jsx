import { FilledButton } from "../../Common/Components/Button"

export default function Home() {
  return (
    <section id="home" className="md:flex h-[calc(100vh-70px)] gap-x-8 p-12">
      <div className="flex flex-col justify-center gap-y-8 md:w-1/2">
        <h1>
          Dapatkan diskon spesial 40% untuk konsultasi pertama anabul Anda!
        </h1>
        <p>
          Mulai dari Rp40.000, Anda dapat berkonsultasi dengan dokter hewan
          selama 1 jam.
        </p>
        <div className="flex justify-center md:justify-start">
          <FilledButton href="#" label="Jadwalkan Konsultasi" />
        </div>
      </div>
      <div className="flex justify-center h-64 md:h-full">
        <img
          src="assets/images/gray_cat.webp"
          alt="Cat"
          className="object-contain"
        />
      </div>
    </section>
  )
}
