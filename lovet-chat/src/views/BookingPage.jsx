import Select from "react-select"
import { useState } from "react"
import fb from "../services/firebase"

const BookingPage = () => {
  const pets = [
    { value: "anjing", label: "Anjing" },
    { value: "kucing", label: "Kucing" },
    { value: "kelinci", label: "Kelinci" },
  ]
  const [selectedPet, setSelectedPet] = useState({
    value: null,
    label: "Pilih hewan...",
  })
  const [nama, setNama] = useState("")
  const [email, setEmail] = useState("")
  const [deskripsiHewan, setDeskripsiHewan] = useState("")
  const [tanggal, setTanggal] = useState("")
  const [nomorHape, setNomorHape] = useState(null)

  const handleBookingSubmit = (e) => {
    e.preventDefault()

    // add data to firestore
    if (
      nama !== null &&
      email !== null &&
      selectedPet.value !== null &&
      tanggal !== null &&
      nomorHape !== null &&
      deskripsiHewan !== null
    ) {
      fb.firestore
        .collection("Booking")
        .add({
          nama: nama,
          email: email,
          pet: selectedPet.value,
          tanggal: new Date(tanggal),
          nomorHape: nomorHape,
          deskripsiHewan: deskripsiHewan,
        })
        .then((docRef) => {
          alert("Booking berhasil!")

          setDeskripsiHewan("")
          setEmail("")
          setNama("")
          setNomorHape("")
          setSelectedPet({ value: null, label: "Pilih hewan..." })
          setTanggal("")
        })
    } else {
      alert("Dimohon untuk mengisi semua data yang diperlukan!")
    }
  }

  return (
    <>
      <div>
        <h1>Booking Page</h1>
      </div>

      <form>
        <label htmlFor="nama">Nama</label>
        <input
          id="nama"
          type="text"
          onChange={(e) => setNama(e.target.value)}
          value={nama}
        />

        <br />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <br />

        <label htmlFor="pilihHewan">Pilih Hewan</label>
        <Select
          id="pilihHewan"
          options={pets}
          value={selectedPet}
          onChange={(selection) => {
            setSelectedPet(selection)
          }}
        />

        <br />

        <label htmlFor="tanggal">Tanggal</label>
        <input
          id="tanggal"
          type="datetime-local"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
        />

        <br />

        <label htmlFor="nomorHape">No. Telp</label>
        <input
          id="nomorHape"
          type="number"
          onChange={(e) => setNomorHape(e.target.value)}
          value={nomorHape}
        />

        <br />

        <label htmlFor="deskripsiHewan">Deskripsi Hewan</label>
        <textarea
          id="deskripsiHewan"
          cols="30"
          rows="10"
          value={deskripsiHewan}
          onChange={(e) => setDeskripsiHewan(e.target.value)}
        ></textarea>

        <br />

        <button onClick={handleBookingSubmit} type="submit">
          Save
        </button>
      </form>

      {nama}

      <br />

      {email}

      <br />

      {selectedPet.value}

      <br />

      {tanggal}

      <br />

      {nomorHape}

      <br />

      {deskripsiHewan}

      <br />
    </>
  )
}

export default BookingPage
