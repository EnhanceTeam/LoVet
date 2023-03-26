import ReasonItem from "./Components/ReasonItem"

export default function WhyUs() {
  return (
    <section id="why-us" className="flex flex-col justify-center h-screen gap-y-16 p-12 bg-primary-container">
      <div className="flex justify-center text-center">
        <h1 className="font-bold">Mengapa LoVet?</h1>
      </div>
      <div className="md:grid grid-cols-3 gap-8">
        <ReasonItem
          icon="assets/images/veterinarian_icon.webp"
          alt="Veterinarian"
          title="Dokter hewan berpengalaman"
          description="Dokter hewan sudah melalui proses verifikasi serta berpengalaman
          dalam bidangnya. Anda dapat langsung berkonsultasi tanpa perlu
          khawatir dengan kualitas konsultasi yang ditawarkan."
        />
        <ReasonItem
          icon="assets/images/voucher_icon.webp"
          alt="Veterinarian"
          title="Harga terjangkau"
          description="Mulai dari Rp40.000, Anda dapat berkonsultasi dengan dokter hewan selama 1 jam."
        />
        <ReasonItem
          icon="assets/images/veterinarian_chat_icon.webp"
          alt="Veterinarian"
          title="Kapan saja, di mana saja"
          description="Tanpa perlu keluar rumah, Anda dapat langsung berkonsultasi dengan dokter hewan pilihan Anda."
        />
      </div>
    </section>
  )
}
