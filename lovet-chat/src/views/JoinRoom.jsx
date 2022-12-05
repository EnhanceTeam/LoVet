import { useState } from "react"
import fb from "../services/firebase"
import { useNavigate } from "react-router-dom"
import { Logout } from "./Auth/Auth"

const JoinRoom = () => {
  const roomRef = fb.firestore.collection("Rooms")
  const [roomIDInput, setRoomIDInput] = useState()
  const navigate = useNavigate()

  const handleEnterChatClick = (e) => {
    e.preventDefault()

    fb.firestore
      .collection("Rooms")
      .doc(roomIDInput)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // todo: satu room hanya bisa untuk 1 akun user dan 1 akun dokter
          navigate(`chatroom/${doc.id}`)
        } else {
          window.alert("Room ID tidak ditemukan!")
        }
      })
  }

  return (
    <>
      <div>
        <Logout />
      </div>
      <form>
        <label htmlFor="roomIDInput">Enter Room ID</label>
        <input
          type="text"
          value={roomIDInput}
          onChange={(e) => setRoomIDInput(e.target.value)}
        />
        <br />
        <button type="submit" onClick={handleEnterChatClick}>
          Enter Chat
        </button>
      </form>
    </>
  )
}

export default JoinRoom
