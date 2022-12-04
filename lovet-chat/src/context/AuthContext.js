import { createContext, useContext, useEffect } from "react"
import fb from "../services/firebase"
import { useState } from "react"

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const unsubcribe = fb.auth.onAuthStateChanged((currentUser) => {
      console.log(currentUser)
      setUser(currentUser)
    })

    return () => unsubcribe()
  }, [])

  const googleSignIn = () => {
    const provider = new fb.firebase.auth.GoogleAuthProvider()
    return fb.auth.signInWithPopup(provider)
  }

  const logout = () => {
    return fb.auth.currentUser && fb.auth.signOut()
  }

  return (
    <UserContext.Provider value={{ googleSignIn, user, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}
