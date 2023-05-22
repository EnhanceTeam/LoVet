import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import fb from "../../services/firebase"
import dayjs from 'dayjs'

const PaymentPage = () => {
    const {paymentID} = useParams()
    const [paymentLink, setPaymentLink] = useState("")
    const [nama, setNama] = useState("")
    const [email, setEmail] = useState("")
    const [deskripsiHewan, setDeskripsiHewan] = useState("")
    const [nomorHape, setNomorHape] = useState(null)
    const [tanggalKonsultasi, setTanggalKonsultasi] = useState(dayjs())
    const [pet, setJenisPet] = useState("")

    const updatePaymentLink = (paymentLink) => {
        fb.firestore.collection("Booking").doc(paymentID).update({
            paymentLink: paymentLink
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    const getPaymentLink = async (data) => {
        console.log(data)
        console.log(`lovet_indonesia_${paymentID}`)
        await fetch('https://api.sandbox.midtrans.com/v1/payment-links', {
        method: 'POST',
        body: JSON.stringify({
            transaction_details: {
                order_id: paymentID,
                gross_amount: 40000,
                payment_link_id: `lovet-indonesia-${paymentID}`
            },
            usage_limit:  1,
            expiry: {
                duration: 1,
                unit: 'days'
            },
            item_details: [
                {
                  id: "Konsultasi",
                  name: "Konsultasi",
                  price: 40000,
                  quantity: 1
                }
            ],
            customer_details: {
                first_name: data.nama,
                email: data.email,
                phone: data.nomorHape,
                notes: "Thank you for your order. Please follow the instructions to complete payment."
            }
        }),
        headers: {
           'Content-type': 'application/json',
           'Accept': 'application/json',
           'Authorization': 'Basic U0ItTWlkLXNlcnZlci1OYTBOdHBxWTVCQnN3R2o5YkZITzdDdDI6'
        },
        })
        .then((response) => response.json())
        .then((data) => {
           console.log(data)
           console.log(data.payment_url)
           updatePaymentLink(data.payment_url)
           setPaymentLink(data.payment_url)
        })
        .catch((err) => {
           console.log(err.message);
        });
        };

    useEffect(() =>{
        fb.firestore
            .collection("Booking")
            .doc(paymentID)
            .get()
            .then((snapshot) => {
                console.log(snapshot.data())
                if(snapshot.get('paymentLink') == null){
                    getPaymentLink(snapshot.data())
                }else{
                    setPaymentLink(snapshot.get('paymentLink'))
                    setEmail(snapshot.get('email'))
                    setNama(snapshot.get('nama'))
                    setNomorHape(snapshot.get('nomorHape'))
                    setDeskripsiHewan(snapshot.get('deskripsiHewan'))
                    setTanggalKonsultasi(dayjs(new Date(snapshot.get('tanggal').toDate())))
                    console.log(tanggalKonsultasi+"aaa")
                    setJenisPet(snapshot.get('pet'))
                }
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
            <ul className="hidden md:flex flex-row">
            </ul>
            </div>
        </div>
        </nav>
            <div className="flex flex-col gap-y-8 px-12 py-12 md:px-32 lg:px-64">
                <h1>Detail Pembayaran: </h1>
                <p>Nama: {nama}</p>
                <p>Email: {email}</p>
                <p>Nomor Handphone: {nomorHape}</p>
                <p>Tanggal Konsultasi: {tanggalKonsultasi.format("DD/MM/YYYY HH")}</p>
                <p>Jenis Hewan Peliharaan: {pet}</p>
                <p>Deskripsi Hewan: {deskripsiHewan}</p>
           
            <div className="flex justify-center mt-10">
                <a href={paymentLink} className=" flex justify-center bg-primary-container hover:bg-yellow-200 rounded-full px-8 py-2 transition">Bayar</a>
            </div>
            </div>
        </>
    )
}

export default PaymentPage