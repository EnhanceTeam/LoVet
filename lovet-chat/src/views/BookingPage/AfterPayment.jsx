import React from 'react';
import { useNavigate } from "react-router-dom"
import { buttonTheme } from "../../themes/theme"
import { Button, ThemeProvider } from "@mui/material"
import { HomeRounded } from "@mui/icons-material"

const HomeButton = (e) => {
    const navigate = useNavigate()

    const handleHomeClicked = (e) => {
        e.preventDefault()

        navigate("/")
    }

    return (
        <ThemeProvider theme={buttonTheme}>
            <Button
                className="rounded-button"
                onClick={handleHomeClicked}
                startIcon={<HomeRounded />}
                variant="contained"
                color="secondary"
                disableElevation
            >
                Kembali ke beranda
            </Button>
        </ThemeProvider>
    )
}

const AfterPayment = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center h-screen">
            <div className="flex flex-col justify-center items-center m-4">
                <img
                    className="max-w-full-x-4 max-h-20"
                    src="assets/svg/lovet_logo_horizontal_transparent.svg"
                    alt="Lovet logo"
                />
            </div>
            <div className="flex flex-auto flex-col justify-center items-center gap-y-8">
                <h2>Terima kasih atas pembayaran Anda!</h2>
                <img
                    className="max-h-60"
                    src="assets/images/payment_confirm.png"
                    alt="paymentConfirm"
                />
                <p className="text-lg font-light">
                Pembayaran Anda telah berhasil diproses. Team kami akan segera menghubungi Anda melalui Whatsapp.
                </p>
                <HomeButton />
            </div>
            <div className="flex flex-col justify-center items-center"></div>
        </div>
  );
}

export default AfterPayment