import React from "react"
import { useNavigate } from "react-router-dom"
import { Button, ThemeProvider } from "@mui/material"
import { HomeRounded } from "@mui/icons-material"
import { buttonTheme } from "../../themes/theme"
import lovetLogoHorizontalTransparent from "../../assets/svg/lovet_logo_horizontal_transparent.svg"
import error404Image from "../../assets/svg/lovet_404.svg"
import "./NotFound.css"

const HomeButton = (e) => {
    const navigate = useNavigate()

    const handleHomeClicked = (e) => {
        e.preventDefault()

        navigate("/")
    }

    return (
        <ThemeProvider theme={buttonTheme}>
            <Button
                className="rounded_button"
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
        <div className="not_found_main">
            <div className="not_found_top">
                <img
                    className="not_found_logo"
                    src={lovetLogoHorizontalTransparent}
                    alt="Error 404"
                />
            </div>
            <div className="not_found_center">
                <h2>Yah, halaman yang Anda cari tidak tersedia</h2>
                <img
                    className="not_found_image"
                    src={error404Image}
                    alt="Error 404"
                />
                <p>
                    Halaman yang Anda cari mungkin saja telah dihapus,
                    dipindahkan, diganti atau bahkan tidak ada.
                </p>
                <HomeButton />
            </div>
            <div className="not_found_bottom"></div>
        </div>
    )
}

export default NotFound
