import { useState } from "react"
import { useNavigate } from "react-router-dom"
import fb from "../../services/firebase"
import { Logout } from "../Auth/Auth"
import { Alert, Snackbar, TextField, ThemeProvider } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { buttonTheme } from "../../themes/theme"
import lovetLogoHorizontalTransparent from "../../assets/svg/lovet_logo_horizontal_transparent.svg"
import "./join-room.css"

const JoinRoom = () => {
    const roomRef = fb.firestore.collection("Rooms")
    const [roomIDInput, setRoomIDInput] = useState()
    const [roomIdSnackbar, setRoomIdSnackbar] = useState()
    const [loadingState, setLoadingState] = useState(false)
    const [snackbarState, setSnackbarState] = useState(false)
    const navigate = useNavigate()

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return
        }

        setSnackbarState(false)
    }

    const handleEnterChatClick = (e) => {
        if (!roomIDInput) {
            return
        }

        e.preventDefault()

        setLoadingState(true)
        fb.firestore
            .collection("Rooms")
            .doc(roomIDInput)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    // todo: satu room hanya bisa untuk 1 akun user dan 1 akun dokter
                    navigate(`chatroom/${doc.id}`)
                } else {
                    setRoomIdSnackbar(roomIDInput)
                    setSnackbarState(true)
                }
                setLoadingState(false)
            })
    }

    return (
        <div className="join_room_main">
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackbarState}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="warning"
                    sx={{ width: "100%" }}
                >
                    Ruang chat dengan room ID "{roomIdSnackbar}" tidak ditemukan
                </Alert>
            </Snackbar>
            <div className="join_room_center">
                <div className="join_room_center_top">
                    <div className="join_room_center_top_left"></div>
                    <div className="join_room_center_top_center">
                        <img
                            className="join_room_logo"
                            src={lovetLogoHorizontalTransparent}
                            alt="Lovet logo"
                        />
                    </div>
                    <div className="join_room_center_top_right">
                        <Logout />
                    </div>
                </div>
                <div className="join_room_center_center">
                    <div className="join_room_center_center_text">
                        <h2>Silahkan masukkan room ID</h2>
                    </div>
                    <TextField
                        className="rounded_outlined_text_field"
                        variant="outlined"
                        placeholder="Room ID"
                        value={roomIDInput}
                        onChange={(e) => setRoomIDInput(e.target.value)}
                        size="small"
                        fullWidth
                        autoFocus
                    />
                    <ThemeProvider theme={buttonTheme}>
                        <LoadingButton
                            className="rounded_button"
                            onClick={handleEnterChatClick}
                            variant="contained"
                            disableElevation
                            fullWidth
                            loading={loadingState}
                        >
                            Masuk ruang chat
                        </LoadingButton>
                    </ThemeProvider>
                </div>
                <div className="join_room_center_bottom"></div>
            </div>
        </div>
    )
}

export default JoinRoom
