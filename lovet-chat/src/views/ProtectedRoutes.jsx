import React, { useEffect } from "react"
import { UserAuth } from "../context/AuthContext"
import { useParams } from "react-router-dom"
import fb from "../services/firebase"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ReactSession } from "react-client-session"

const ProtectedRoutes = ({ children }) => {
  const { user } = UserAuth()
  const roomID = ReactSession.get("roomID")
  const [roomExist, setRoomExist] = useState(false)
  const navigate = useNavigate()

  // kalo login jadi admin ttp ga bisa masuk

  // if (roomID !== null) {
  //   if (user && user.uid !== "aC0zKtkpqgZY7MBI3QaCppjXvYE3") {
  //     return <Navigate to={-1} />
  //   }
  // } else {
  //   return <NotFound />
  // }

  // todo: check room id exist ato nda
  useEffect(() => {
    fb.firestore
      .collection("Rooms")
      .doc(roomID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setRoomExist(true)
        } else {
          setRoomExist(false)
        }
      })
      .catch((error) => {
        setRoomExist(false)
      })
  })

  console.log(roomExist)

  if (!user) {
    navigate("/menu")
  }

  return <>{roomExist ? children : navigate("/menu")}</>
}

export default ProtectedRoutes
