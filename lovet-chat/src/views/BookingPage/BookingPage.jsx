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
import { buttonTheme } from "../../themes/theme"
import { useNavigate } from "react-router-dom"
import {
  DatePickerButtonField,
  TimePickerButtonField,
} from "./Components/BookingFormField"

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
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [petDescription, setDeskripsiHewan] = useState("")

  const [nameError, setNameError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [petError, setPetError] = useState("")
  const [dateError, setDateError] = useState("")
  const [timeError, setTimeError] = useState("")
  const [petDescriptionError, setPetDescriptionError] = useState("")

  const [isDateDisabled, setIsDateDisabled] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [selectedTime, setSelectedTime] = useState(dayjs())
  const [bookedDates, setBookedDates] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    setSelectedDate(null)
    setSelectedTime(null)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // listen to booked dates changes
    fb.firestore
      .collection("Booking")
      .where("tanggal", ">", today)
      .onSnapshot((querySnapshot) => {
        // Enable date picker after fetching booked dates
        setIsDateDisabled(false)

        querySnapshot.docs.forEach((doc) => {
          setBookedDates((bookedDates) => [
            ...bookedDates,
            dayjs(new Date(doc.data().tanggal.toDate())),
          ])
        })
      })
  }, [])

  const isBooked = (date) => {
    return bookedDates.some((bookedDate) => {
      return (
        bookedDate.year() === selectedDate?.year() &&
        bookedDate.month() === selectedDate?.month() &&
        bookedDate.date() === selectedDate?.date() &&
        bookedDate.hour() === date.hour() &&
        bookedDate.minute() === date.minute()
      )
    })
  }

  const shouldDisableDate = (date) => {
    const day = date.day()

    // disable booked dates
    if (
      bookedDates.some(
        (bookedDate) =>
          bookedDate.year() === date.year() &&
          bookedDate.month() === date.month() &&
          bookedDate.date() === date.date()
      )
    ) {
      // check if all times are taken
      const bookedTime = bookedDates.filter((bookedDate) => {
        return (
          bookedDate.year() === date.year() &&
          bookedDate.month() === date.month() &&
          bookedDate.date() === date.date()
        )
      })

      // iterate through all times
      const isAllTimeBooked = Array.from({ length: 8 }, (_, index) => {
        // add index hours to selected date
        const timeBetween = bookedTime[0].add(index, "hour")
        // check if time is taken
        return bookedTime.some((booked) => timeBetween.isSame(booked, "hour"))
      }).every(Boolean)

      return isAllTimeBooked
    }

    // disable weekends
    return day === 0 || day === 6
  }

  const handleDateChange = (date) => {
    setDateError("")
    setSelectedDate(date)
    setSelectedTime(null)
  }

  // operational hours
  const minTime = selectedDate?.set("hour", 9)
  const maxTime = selectedDate?.set("hour", 16)

  const handleTimeChange = (date) => {
    setTimeError("")
    const newDate = selectedDate
      .set("hour", date.hour())
      .set("minute", date.minute())
    setSelectedDate(newDate)
    setSelectedTime(newDate)
  }

  const handleNameChange = (value) => {
    const nameRegex = new RegExp("^[a-zA-Z ]*$")

    if (nameRegex.test(value)) {
      setNama(value)
    }

    validateName(value)
  }

  const handlePhoneChange = (value) => {
    const numberRegex = new RegExp("^[0-9]*$")

    if (numberRegex.test(value)) {
      setPhone(value)
    }

    validatePhoneNumber(value)
  }

  const handleEmailChange = (value) => {
    setEmail(value)

    validateEmail(value)
  }

  const handlePetChange = (value) => {
    setPetError("")
    setSelectedPet(value)
  }

  const handlePetDescriptionChange = (value) => {
    setDeskripsiHewan(value)
    validatePetDescription(value)
  }

  const validateName = (value) => {
    if (value.trim().length === 0) {
      setNameError("Nama belum diisi")
    } else {
      setNameError("")
      return true
    }

    return false
  }

  const validatePhoneNumber = (value) => {
    const startsWithZeroRegex = new RegExp("^[0][0-9]*$")
    const phoneNumberRegex = new RegExp("^[0][0-9]{4,19}$")

    if (value.trim().length === 0) {
      setPhoneError("Nomor telepon belum diisi")
    } else if (!startsWithZeroRegex.test(value)) {
      setPhoneError("Nomor telepon harus diawali dengan angka 0")
    } else if (!phoneNumberRegex.test(value)) {
      setPhoneError(
        "Nomor telepon harus diisi minimal 5 digit dan maksimal 20 digit"
      )
    } else {
      setPhoneError("")
      return true
    }

    return false
  }

  const validateEmail = (value) => {
    const emailRegex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")

    if (value.trim().length === 0) {
      setEmailError("Email belum diisi")
    } else if (!emailRegex.test(value)) {
      setEmailError("Email harus diisi dengan benar")
    } else {
      setEmailError("")
      return true
    }

    return false
  }

  const validatePet = (value) => {
    if (value === null) {
      setPetError("Hewan belum dipilih")
    } else {
      setPetError("")
      return true
    }

    return false
  }

  const validateDate = (value) => {
    if (value === null) {
      setDateError("Tanggal belum dipilih")
    } else {
      setDateError("")
      return true
    }

    return false
  }

  const validateTime = (value) => {
    if (value === null) {
      setTimeError("Waktu belum dipilih")
    } else {
      setTimeError("")
      return true
    }

    return false
  }

  const validatePetDescription = (value) => {
    if (value.trim().length === 0) {
      setPetDescriptionError("Deskripsi hewan belum diisi")
    } else {
      setPetDescriptionError("")
      return true
    }

    return false
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()

    validateName(nama)
    validatePhoneNumber(phone)
    validateEmail(email)
    validatePet(selectedPet.value)
    validateDate(selectedDate)
    validateTime(selectedTime)
    validatePetDescription(petDescription)

    if (
      validateName(nama) &&
      validatePhoneNumber(phone) &&
      validateEmail(email) &&
      validatePet(selectedPet.value) &&
      validateDate(selectedDate) &&
      validateTime(selectedTime) &&
      validatePetDescription(petDescription)
    ) {
      // add data to firestore
      setIsSubmitting(true)

      fb.firestore
        .collection("Booking")
        .add({
          nama: nama,
          email: email,
          pet: selectedPet.value,
          tanggal: selectedDate.toDate(),
          nomorHape: phone,
          deskripsiHewan: petDescription,
        })
        .then((docRef) => {
          setIsSubmitting(false)

          // reset form
          setDeskripsiHewan("")
          setEmail("")
          setNama("")
          setPhone("")
          setSelectedPet({ value: null, label: "Pilih hewan..." })
          setSelectedDate(null)
          setSelectedTime(null)

          // navigate to payment page
          navigate(`/payment/${docRef.id}`)
        })
    } else {
      //   alert("Mohon isi semua data yang diperlukan!")
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
            name="Nama"
            placeholder="Nama"
            value={nama}
            error={nameError !== ""}
            helperText={nameError}
            required
            autoFocus
            autoComplete="name"
            onChange={(e) => handleNameChange(e.target.value)}
          />

          <InputField
            id="phone"
            type="text"
            name="Nomor Telepon"
            placeholder="081234567890"
            value={phone}
            error={phoneError !== ""}
            helperText={phoneError}
            required
            autoComplete="tel-national"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={(e) => handlePhoneChange(e.target.value)}
          />

          <InputField
            id="email"
            type="email"
            name="Email"
            placeholder="email@lovet.com"
            value={email}
            error={emailError !== ""}
            helperText={emailError}
            required
            autoComplete="email"
            onChange={(e) => handleEmailChange(e.target.value)}
          />

          <SelectField
            id="pet"
            name="Hewan Peliharaan"
            placeholder={"Pilih Hewan"}
            value={selectedPet.value}
            options={pets}
            onChange={handlePetChange}
            error={petError !== ""}
            helperText={petError}
          />

          <div className="flex flex-row gap-x-4">
            <DatePickerButtonField
              id="date"
              name="Tanggal"
              label={
                selectedDate == null
                  ? "Pilih tanggal"
                  : selectedDate.format("DD MMMM YYYY")
              }
              value={selectedDate}
              format="DD MMMM YYYY"
              onChange={handleDateChange}
              maxDate={dayjs().add(1, "month")}
              views={["month", "day"]}
              shouldDisableDate={shouldDisableDate}
              disablePast
              disabled={isDateDisabled}
              error={dateError !== ""}
              helperText={dateError}
            />

            <TimePickerButtonField
              id="time"
              name="Waktu"
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
              skipDisabled
              disabled={!selectedDate}
              error={timeError !== ""}
              helperText={timeError}
            />
          </div>

          <TextAreaField
            id="animalCondition"
            name="Deskripsi Kondisi Hewan"
            rows="10"
            placeholder="Sudah satu minggu ini hewan saya mengalami demam tinggi"
            value={petDescription}
            error={petDescriptionError !== ""}
            helperText={petDescriptionError}
            required
            onChange={(e) => handlePetDescriptionChange(e.target.value)}
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
      </div>
    </>
  )
}

export default BookingPage
