import { Login } from "@mui/icons-material"
import React, { useEffect } from "react"
import { UserAuth } from "../context/AuthContext"

const ProtectedRoutes = ({ children }) => {
  const { user } = UserAuth()
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

  return children
}

export default ProtectedRoutes
