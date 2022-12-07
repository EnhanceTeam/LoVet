import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import fb from "../../services/firebase"
import { Logout } from "../Auth/Auth"
import { Alert, Snackbar, TextField, ThemeProvider } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { buttonTheme } from "../../themes/theme"
import lovetLogoHorizontalTransparent from "../../assets/svg/lovet_logo_horizontal_transparent.svg"
import "./join-room.css"
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
            navigate("/menu")
          } else {
            if (roomsDoc.get("guest")) {
              // if has user inside room, then back to menu
              navigate("/menu")
            } else {
              // if no user inside room, then get in room
              roomRef.doc(roomsDoc.id).update({
                guest: user.uid,
              })
              navigate(`/menu/chatroom/${roomsDoc.id}`)
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
