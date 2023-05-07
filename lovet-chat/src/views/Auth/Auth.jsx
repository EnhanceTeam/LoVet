import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserAuth } from "../../context/AuthContext"
import { Button, Icon, ThemeProvider } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { LogoutRounded } from "@mui/icons-material"
import { buttonTheme } from "../../themes/theme"

const Login = () => {
    const { googleSignIn } = UserAuth()
    const [loadingState, setLoadingState] = useState(false)
    const navigate = useNavigate()

    const handleLoginClick = (e) => {
        e.preventDefault()

        setLoadingState(true)
        googleSignIn()
        setLoadingState(false)

        navigate("/menu")
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-pet-pattern">
            <div className="flex flex-col justify-center items-center gap-y-2 rounded-2xl w-4/5 h-4/5 p-4 m-4 bg-surface shadow-md">
                <div className="flex flex-row justify-center items-center gap-x-2">
                    <img
                        className="max-w-full-x-4 max-h-20"
                        src="assets/svg/lovet_logo_horizontal_transparent.svg"
                        alt="Lovet logo"
                    />
                </div>
                <div className="flex flex-auto flex-col justify-center items-center gap-y-12">
                    <img
                        className="max-w-full-x-12"
                        src="assets/svg/chat_bubble_2.svg"
                        alt="Chat bubble"
                    />
                    <div className="flex flex-col justify-center items-center text-center gap-y-2">
                        <h2>
                            Selamat Datang di LoVet Chat Room
                        </h2>
                        <p className="text-lg font-light">
                            Silahkan login dengan akun google anda
                        </p>
                    </div>
                    <ThemeProvider theme={buttonTheme}>
                        <LoadingButton
                            className="rounded-button"
                            onClick={handleLoginClick}
                            startIcon={
                                <Icon className="text-xs">
                                    <img
                                        src="assets/images/g_brand.png"
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
                <div className="flex flex-row justify-center items-center gap-x-2"></div>
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

        navigate("/menu")
    }

    return (
        <>
            <ThemeProvider theme={buttonTheme}>
                <Button
                    className="icon-button"
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
