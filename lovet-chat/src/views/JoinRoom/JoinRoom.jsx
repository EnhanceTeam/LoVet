import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import fb from "../../services/firebase"
import { Logout } from "../Auth/Auth"
import { Alert, Snackbar, TextField, ThemeProvider } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { buttonTheme } from "../../themes/theme"
import { UserAuth } from "../../context/AuthContext"

const JoinRoom = () => {
  const [roomIDInput, setRoomIDInput] = useState()
  const [roomIdSnackbar, setRoomIdSnackbar] = useState()
  const [loadingState, setLoadingState] = useState(false)
  const [snackbarState, setSnackbarState] = useState(false)
  const { user } = UserAuth()
  const navigate = useNavigate()
  const roomRef = fb.firestore.collection("Rooms")
  const [vets, setVets] = useState([])
  const [roomIdTextFieldError, setRoomIdTextFieldError] = useState(false)

  useEffect(() => {
    fb.firestore
      .collection("Veterinarian")
      .get()
      .then((docs) => {
        setVets(
          docs.docs.map((doc) => {
            return doc.get("email")
          })
        )
      })
  }, [])

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setSnackbarState(false)
  }

  const handleEnterChatClick = (e) => {
    setRoomIdTextFieldError(!roomIDInput)

    if (!roomIDInput) {
      return
    }

    e.preventDefault()

    setLoadingState(true)
    roomRef
      .doc(roomIDInput)
      .get()
      .then((roomsDoc) => {
        if (roomsDoc.exists) {
          // todo: satu room hanya bisa untuk 1 akun user dan 1 akun dokter
          // todo: cek apakah sudah ada user yang pernah masuk ruang tersebut, kalo ada navigate ke menu, kalo belum dimasukkan
          const filteredVets = vets.filter((vet) => vet === user.email)

          if (filteredVets.length !== 0) {
            // if is vet, then back to menu
            if (roomsDoc.get("vetEmail") === user.email) {
              roomRef.doc(roomsDoc.id).update({
                vetProfilePicture: user.photoURL,
              })
              navigate(`/menu/chatroom/${roomsDoc.id}`)
            } else {
              navigate("/menu")
            }
          } else {
            if (!roomsDoc.get("guest")) {
              roomRef.doc(roomsDoc.id).update({
                guest: user.uid,
                guestName: user.displayName,
                guestProfilePicture: user.photoURL,
              })
              navigate(`/menu/chatroom/${roomsDoc.id}`)
            } else if (roomsDoc.get("guest") === user.uid) {
              navigate(`/menu/chatroom/${roomsDoc.id}`)
            } else {
              navigate("/menu")
            }
          }
        } else {
          setRoomIdSnackbar(roomIDInput)
          setSnackbarState(true)
        }
        setLoadingState(false)
      })
      .catch((error) => {
        setLoadingState(false)
      })
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-pet-pattern">
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
      <div className="flex flex-col justify-center items-center gap-y-4 rounded-2xl w-4/5 h-4/5 p-4 m-4 bg-surface shadow-md">
        <div className="flex flex-row justify-center items-center gap-x-2 w-full px-4">
          <div className="flex flex-row justify-center items-center gap-x-4 p-4"></div>
          <div className="flex flex-auto flex-row justify-center items-center gap-x-4">
            <img
              className="max-w-full-x-4 max-h-20"
              src="assets/svg/lovet_logo_horizontal_transparent.svg"
              alt="Lovet logo"
            />
          </div>
          <div className="flex flex-row justify-center items-center gap-x-4">
            <Logout />
          </div>
        </div>
        <div className="flex flex-auto flex-col justify-center items-center w-full gap-y-4">
          <div className="flex flex-col justify-center items-center gap-y-2 text-center text-lg font-light">
            <h2>Silahkan masukkan room ID</h2>
          </div>
          <TextField
            className="!min-w-fit !max-w-xs rounded-outlined-text-field"
            variant="outlined"
            placeholder="Room ID"
            helperText={roomIdTextFieldError && "Room ID tidak boleh kosong"}
            error={roomIdTextFieldError}
            value={roomIDInput}
            onChange={(e) => setRoomIDInput(e.target.value)}
            size="small"
            fullWidth
            autoFocus
          />
          <ThemeProvider theme={buttonTheme}>
            <LoadingButton
              className="!min-w-fit !max-w-xs rounded-button"
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
        <div className="flex flex-row justify-center items-center gap-x-2"></div>
      </div>
    </div>
  )
}

export default JoinRoom
