export default function TentangLovet() {
  return (
    <section id="TentangLovet" className="md:flex">
      <div className="flex justify-center md:w-1/2">
        <img
          src="assets/images/tentang_lovet.webp"
          alt="tentang_lovet"
          className="object-cover h-80 md:h-full w-full"
        />
      </div>
      <div className="flex flex-col justify-center md:text-lg lg:text-xl md:w-1/2 p-12">
        <p className="mr-30">
          "LoVet hadir untuk memberikan kemudahan kepada para pemilik hewan
          untuk berkonsultasi kepada dokter hewan berpengalaman secara mudah,
          cepat dan terjangkau."
        </p>
      </div>
    </section>
  )
}
