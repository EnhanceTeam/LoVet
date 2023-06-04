import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import fb from "../../services/firebase"
import dayjs from "dayjs"
import "dayjs/locale/id"
import { LoadingButton } from "@mui/lab"
import { CircularProgress, ThemeProvider } from "@mui/material"
import { buttonTheme } from "../../themes/theme"

const PaymentPage = () => {
  const { paymentID } = useParams()
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const [paymentLink, setPaymentLink] = useState("")
  const [nama, setNama] = useState("")
  const [email, setEmail] = useState("")
  const [location, setLocation] = useState("")
  const [deskripsiHewan, setDeskripsiHewan] = useState("")
  const [nomorHape, setNomorHape] = useState(null)
  const [tanggalKonsultasi, setTanggalKonsultasi] = useState(dayjs())
  const [pet, setJenisPet] = useState("")

  const updatePaymentLink = (paymentLink) => {
    fb.firestore
      .collection("Booking")
      .doc(paymentID)
      .update({
        paymentLink: paymentLink,
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error)
      })
  }

  const getPaymentLink = async (data) => {
    await fetch("https://api.sandbox.midtrans.com/v1/payment-links", {
      method: "POST",
      body: JSON.stringify({
        transaction_details: {
          order_id: paymentID,
          gross_amount: 40000,
          payment_link_id: `lovet-indonesia-${paymentID}`,
        },
        usage_limit: 1,
        expiry: {
          duration: 1,
          unit: "days",
        },
        item_details: [
          {
            id: "Konsultasi",
            name: "Konsultasi",
            price: 40000,
            quantity: 1,
          },
        ],
        customer_details: {
          first_name: data.nama,
          email: data.email,
          phone: data.nomorHape,
          notes:
            "Thank you for your order. Please follow the instructions to complete payment.",
        },
      }),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization:
          "Basic U0ItTWlkLXNlcnZlci1OYTBOdHBxWTVCQnN3R2o5YkZITzdDdDI6",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        updatePaymentLink(data.payment_url)
        setPaymentLink(data.payment_url)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const handlePayment = () => {
    setIsRedirecting(true)
    window.location.href = paymentLink
  }

  useEffect(() => {
	dayjs.locale("id")

    fb.firestore
      .collection("Booking")
      .doc(paymentID)
      .get()
      .then((snapshot) => {
        setEmail(snapshot.get("email"))
        setNama(snapshot.get("nama"))
        setNomorHape(snapshot.get("nomorHape"))
        setDeskripsiHewan(snapshot.get("deskripsiHewan"))
        setLocation(snapshot.get("lokasi"))
        setTanggalKonsultasi(dayjs(new Date(snapshot.get("tanggal").toDate())))
        setJenisPet(snapshot.get("pet"))

        if (snapshot.get("paymentLink") == null) {
          getPaymentLink(snapshot.data())
        } else {
          setPaymentLink(snapshot.get("paymentLink"))
        }

        setIsPageLoading(false)
      })
      .catch((e) => console.log(e))
  }, [])

  return (
    <>
      <nav className="sticky top-0 px-8 bg-primary-container">
        <div className="flex flex-wrap justify-between items-center">
          <a href="https://lovet.site">
            <img
              src="/assets/svg/lovet_logo_horizontal_transparent.svg"
              alt="Lovet logo"
              className="h-14"
            />
          </a>
          <div className="flex">
            <ul className="hidden md:flex flex-row"></ul>
          </div>
        </div>
      </nav>

      {isPageLoading ? (
        <div className="flex justify-center items-center h-[calc(100vh-56px)]">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-y-8 px-12 py-12 md:px-32 lg:px-64">
          <h1>Detail Pembayaran: </h1>
          <p>Nama: {nama}</p>
          <p>Email: {email}</p>
          <p>Nomor Handphone: {nomorHape}</p>
          <p>Media konsultasi: {location === "online_chat" ? "Online chat" : "Datang langsung"}</p>
          <p>
            Waktu Konsultasi:{" "}
            {tanggalKonsultasi.format("HH:mm, DD MMMM YYYY")}
          </p>
          <p>Jenis Hewan Peliharaan: {pet}</p>
          <p>Deskripsi Hewan: {deskripsiHewan}</p>
          <div className="mt-8">
            <ThemeProvider theme={buttonTheme}>
              <LoadingButton
                onClick={handlePayment}
                variant="contained"
                disableElevation
                fullWidth
                loading={isRedirecting}
              >
                Bayar
              </LoadingButton>
            </ThemeProvider>
          </div>
          {/* <div className="flex justify-center mt-10">
            <a
              href={paymentLink}
              className=" flex justify-center bg-primary-container hover:bg-yellow-200 rounded-full px-8 py-2 transition"
            >
              Bayar
            </a>
          </div> */}
        </div>
      )}
    </>
  )
}

export default PaymentPage
