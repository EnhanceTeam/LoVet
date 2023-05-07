import { useState } from "react"
import fb from "../../services/firebase"
import {
  InputField,
  SelectField,
  TextAreaField,
} from "../Common/Components/Input"
import NavBar from "../Common/Components/NavBar"
import { FilledButton } from "../Common/Components/Button"

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
      <NavBar />
      <div className="flex flex-col gap-y-8 p-12">
        <h1>Buat Jadwal Konsultasi</h1>

        <form className="flex flex-col gap-y-4">
          <InputField
            id="name"
            type="text"
            label="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <InputField
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <SelectField
            id="pet"
            label="Pilih Hewan"
            value={selectedPet.value}
            options={pets}
            onChange={(selection) => setSelectedPet(selection)}
          />

          <InputField
            id="date"
            type="datetime-local"
            min={new Date().toISOString().slice(0, -8)}
            label="Tanggal"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />

          <InputField
            id="phone"
            type="number"
            label="Nomor Telepon"
            value={nomorHape}
            onChange={(e) => setNomorHape(e.target.value)}
          />

          <TextAreaField
            id="animalCondition"
            label="Deskripsi Kondisi Hewan"
            rows="10"
            value={deskripsiHewan}
            onChange={(e) => setDeskripsiHewan(e.target.value)}
          />

          <FilledButton
            label="Buat Jadwal Konsultasi"
            type="submit"
            onClick={handleBookingSubmit}
          />
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
      </div>
    </>
  )
}

export default BookingPage
