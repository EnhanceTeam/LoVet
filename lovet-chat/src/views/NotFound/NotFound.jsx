import React from "react"
import { useNavigate } from "react-router-dom"
import { Button, ThemeProvider } from "@mui/material"
import { HomeRounded } from "@mui/icons-material"
import { buttonTheme } from "../../themes/theme"

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

const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center text-center h-screen bg-primary-container">
            <div className="flex flex-col justify-center items-center m-4">
                <img
                    className="max-w-full-x-4 max-h-20"
                    src="assets/svg/lovet_logo_horizontal_transparent.svg"
                    alt="Lovet logo"
                />
            </div>
            <div className="flex flex-auto flex-col justify-center items-center gap-y-8">
                <h2>Yah, halaman yang Anda cari tidak tersedia</h2>
                <img
                    className="max-h-60"
                    src="assets/svg/lovet_404.svg"
                    alt="Error 404"
                />
                <p className="text-lg font-light">
                    Halaman yang Anda cari mungkin saja telah dihapus,
                    dipindahkan, diganti atau bahkan tidak ada.
                </p>
                <HomeButton />
            </div>
            <div className="flex flex-col justify-center items-center"></div>
        </div>
    )
}

export default NotFound
