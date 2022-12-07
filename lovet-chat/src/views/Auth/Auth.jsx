import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserAuth } from "../../context/AuthContext"
import { Button, Icon, ThemeProvider } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { LogoutRounded } from "@mui/icons-material"
import { buttonTheme } from "../../themes/theme"
import chatBubble2 from "../../assets/svg/chat_bubble_2.svg"
import lovetLogoHorizontalTransparent from "../../assets/svg/lovet_logo_horizontal_transparent.svg"
import gBrand from "../../assets/images/g_brand.png"
import "./auth.css"

const Login = () => {
    const { googleSignIn } = UserAuth()
    const [loadingState, setLoadingState] = useState(false)

    const handleLoginClick = (e) => {
        e.preventDefault()

        setLoadingState(true)
        googleSignIn()
        setLoadingState(false)
    }

    return (
        <div className="login_main">
            <div className="login_center">
                <div className="login_center_top">
                    <img
                        className="login_logo"
                        src={lovetLogoHorizontalTransparent}
                        alt="Lovet logo"
                    />
                </div>
                <div className="login_center_center">
                    <img className="login_center_center_image" src={chatBubble2} alt="Chat bubble" />
                    <div className="login_center_center_text">
                        <h2>Selamat Datang di LoVet Chat Room</h2>
                        <p>Silahkan login dengan akun google anda</p>
                    </div>
                    <ThemeProvider theme={buttonTheme}>
                        <LoadingButton
                            className="rounded_button"
                            onClick={handleLoginClick}
                            startIcon={
                                <Icon fontSize="10px">
                                    <img
                                        className="icon_small"
                                        src={gBrand}
                                        alt="Google logo"
                                    />
                                </Icon>
                            }
                            variant="contained"
                            disableElevation
                            loading={loadingState}
                        >
                            Lanjut dengan Google
                        </LoadingButton>
                    </ThemeProvider>
                </div>
                <div className="login_center_bottom"></div>
            </div>
        </div>
    )
}

const Logout = (e) => {
    const { logout } = UserAuth()
    const navigate = useNavigate()

    const handleLogoutClick = (e) => {
        e.preventDefault()

        logout()

        navigate("/")
    }

    return (
        <>
            <ThemeProvider theme={buttonTheme}>
                <Button
                    className="icon_button"
                    onClick={handleLogoutClick}
                    startIcon={<LogoutRounded />}
                    variant="contained"
                    color="secondary"
                    disableElevation
                ></Button>
            </ThemeProvider>
        </>
    )
}

export { Login, Logout }
