import { Login } from "@mui/icons-material"
import React, { useEffect } from "react"
import { UserAuth } from "../context/AuthContext"
import { useParams } from "react-router-dom"
import fb from "../services/firebase"
import Menu from "./Menu"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ProtectedRoutes = ({ children }) => {
  const { user } = UserAuth()
  const { roomID } = useParams()
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

  if (!user) {
    navigate("/menu")
  }

  return <>{roomExist ? children : navigate("/menu")}</>
}

export default ProtectedRoutes
