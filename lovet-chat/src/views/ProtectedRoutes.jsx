import { Login } from "@mui/icons-material"
import React, { useEffect } from "react"
import { UserAuth } from "../context/AuthContext"
import { useParams } from "react-router-dom"
import { findByAltText } from "@testing-library/react"
import Menu from "./Menu"
import fb from "../services/firebase"

const ProtectedRoutes = ({ children }) => {
  const { user } = UserAuth()
  const { roomID } = useParams()
  // kalo login jadi admin ttp ga bisa masuk

  // if (roomID !== null) {
  //   if (user && user.uid !== "aC0zKtkpqgZY7MBI3QaCppjXvYE3") {
  //     return <Navigate to={-1} />
  //   }
  // } else {
  //   return <NotFound />
  // }

  if (!user) {
    return <Login />
  }

  if (!fb.firestore.collection("Rooms").doc(roomID).get()) {
    return <Menu />
  }

  return children
}

export default ProtectedRoutes
