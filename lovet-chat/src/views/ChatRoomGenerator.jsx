import fb from "../services/firebase"
import { useState } from "react"
import { Logout } from "./Auth"

const ChatRoomGenerator = () => {
  const [startConsultation, setStartConsultation] = useState()
  const [endConsultation, setEndConsultation] = useState()
  const [roomID, setRoomID] = useState()

  const handleNewChatRoomSubmit = (e) => {
    e.preventDefault()

    if (startConsultation.trim() === null || endConsultation.trim() === null) {
      return
    }

    fb.firestore
      .collection("Rooms")
      .add({
        startConsultation: new Date(startConsultation),
        endConsultation: new Date(endConsultation),
      })
      .then((docRef) => {
        setLoading(true)
        setRoomID(docRef.id)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div>
        <Logout />
      </div>
      <form>
        <label htmlFor="startConsult">Jadwal Mulai:</label>
        <input
          id="startConsult"
          type="datetime-local"
          value={startConsultation}
          onChange={(e) => setStartConsultation(e.target.value)}
        />

        <br />

        <label htmlFor="endConsult">Jadwal Berakhir:</label>
        <input
          id="endConsult"
          type="datetime-local"
          value={endConsultation}
          onChange={(e) => setEndConsultation(e.target.value)}
        />

        <br />
        <button type="submit" onClick={handleNewChatRoomSubmit}>
          Create New Chat Room
        </button>
      </form>
      <div>{roomID ? `Room ID: ${roomID}` : null}</div>
    </>
  )
}

export default ChatRoomGenerator
