import { useEffect, useState } from "react"
import { LoadingButton } from "@mui/lab"
import { ThemeProvider } from "@mui/material"
import dayjs from "dayjs"
import fb from "../../services/firebase"
import {
  InputField,
  SelectField,
  TextAreaField,
} from "../Common/Components/Input"
import NavBar from "../Common/Components/NavBar"
import {
  DatePickerWithButtonField,
  TimePickerWithButtonField,
} from "../Common/Components/PickerWithButtonField"
import { buttonTheme } from "../../themes/theme"

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
  const [nomorHape, setNomorHape] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [selectedTime, setSelectedTime] = useState(dayjs())
  const [bookedDates, setBookedDates] = useState([])
  useEffect(() => {
    setSelectedDate(null)
    setSelectedTime(null)

    // listen to booked dates changes
    fb.firestore
      .collection("Booking")
      .where("tanggal", ">", new Date())
      .onSnapshot((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          setBookedDates((bookedDates) => [
            ...bookedDates,
            dayjs(new Date(doc.data().tanggal.toDate())),
          ])
        })
      })
  }, [])

  const isBooked = (date) => {
    return bookedDates.some(
      (bookedDate) =>
        bookedDate.hour() === date.hour() &&
        bookedDate.minute() === date.minute()
    )
  }

  const isWeekend = (date) => {
    const day = date.day()

    return day === 0 || day === 6
  }

  // operational hours
  const minTime = selectedDate?.set("hour", 9)
  const maxTime = selectedDate?.set("hour", 16)

  const handleTimeChange = (date) => {
    const newDate = selectedDate
      .set("hour", date.hour())
      .set("minute", date.minute())
    setSelectedDate(newDate)
    setSelectedTime(newDate)
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()

    // add data to firestore
    if (
      nama !== null &&
      email !== null &&
      selectedPet.value !== null &&
      selectedDate !== null &&
      selectedTime !== null &&
      nomorHape !== null &&
      deskripsiHewan !== null
    ) {
      setIsSubmitting(true)

      fb.firestore
        .collection("Booking")
        .add({
          nama: nama,
          email: email,
          pet: selectedPet.value,
          tanggal: selectedDate.toDate(),
          nomorHape: nomorHape,
          deskripsiHewan: deskripsiHewan,
        })
        .then((docRef) => {
          setIsSubmitting(false)

          alert("Booking berhasil!")

          setDeskripsiHewan("")
          setEmail("")
          setNama("")
          setNomorHape("")
          setSelectedPet({ value: null, label: "Pilih hewan..." })
          setSelectedDate(null)
          setSelectedTime(null)
        })
    } else {
      alert("Dimohon untuk mengisi semua data yang diperlukan!")
    }
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col gap-y-8 px-12 py-12 md:px-32 lg:px-64">
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
            label={
              selectedPet.value === null ? "Pilih Hewan" : selectedPet.label
            }
            value={selectedPet.value}
            options={pets}
            onChange={(selection) => setSelectedPet(selection)}
          />

          <div className="flex flex-row gap-x-4">
            <div className="flex flex-col gap-y-2 w-1/2">
              <label htmlFor="date" className="px-2">
                Tanggal
              </label>
              <DatePickerWithButtonField
                id="date"
                label={
                  selectedDate == null
                    ? "Pilih tanggal"
                    : selectedDate.format("DD MMMM YYYY")
                }
                value={selectedDate}
                format="DD MMMM YYYY"
                onChange={setSelectedDate}
                maxDate={dayjs().add(1, "month")}
                views={["month", "day"]}
                shouldDisableDate={isWeekend}
                disablePast
              />
            </div>

            <div className="flex flex-col gap-y-2 w-1/2">
              <label htmlFor="time" className="px-2">
                Waktu
              </label>
              <TimePickerWithButtonField
                id="time"
                label={
                  selectedTime == null
                    ? "Pilih waktu"
                    : selectedTime.format("HH:mm")
                }
                value={selectedTime}
                onChange={handleTimeChange}
                onAccept={handleTimeChange}
                minTime={minTime}
                maxTime={maxTime}
                minutesStep={60}
                shouldDisableTime={isBooked}
                disablePast
                skipDisabled
                disabled={!selectedDate}
              />
            </div>
          </div>

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

          <ThemeProvider theme={buttonTheme}>
            <LoadingButton
              onClick={handleBookingSubmit}
              variant="contained"
              disableElevation
              fullWidth
              loading={isSubmitting}
            >
              Buat Jadwal Konsultasi
            </LoadingButton>
          </ThemeProvider>
        </form>

        {nama}

        <br />

        {email}

        <br />

        {selectedPet.value}

        <br />

        {selectedDate?.format("DD/MM/YYYY HH:mm")}

        <br />

        {selectedTime?.format("DD/MM/YYYY HH:mm")}

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
