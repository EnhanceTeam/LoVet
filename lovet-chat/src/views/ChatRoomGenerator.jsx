import fb from "../services/firebase"
import { useEffect, useState } from "react"
import { Logout } from "./Auth/Auth"
import Select from "react-select"
import { ReactSession } from "react-client-session"

const ChatRoomGenerator = () => {
  // todo: tambah input form dokter hewan yang akan mengurusi konsultasi

  const [startConsultation, setStartConsultation] = useState()
  const [endConsultation, setEndConsultation] = useState()
  const [roomID, setRoomID] = useState()
  const [vets, setVets] = useState([])
  const [selectedVet, setSelectedVet] = useState({
    value: null,
    label: "Select Veterinarian...",
  })

  useEffect(() => {
    fb.firestore
      .collection("Veterinarian")
      .get()
      .then((docs) => {
        setVets(
          docs.docs.map((doc) => {
            return { value: doc.get("email"), label: doc.get("name") }
          })
        )
      })
  }, [])

  const handleNewChatRoomSubmit = (e) => {
    e.preventDefault()

    if (startConsultation.trim() === null || endConsultation.trim() === null) {
      return
    }

    fb.firestore
      .collection("Rooms")
      .add({
        vetEmail: selectedVet.value,
        vetName: selectedVet.label,
        startConsultation: new Date(startConsultation),
        endConsultation: new Date(endConsultation),
      })
      .then((docRef) => {
        setRoomID(docRef.id)
        ReactSession.set("roomID", docRef.id)
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

        <Select
          options={vets}
          value={selectedVet}
          onChange={(selection) => {
            setSelectedVet(selection)
          }}
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
