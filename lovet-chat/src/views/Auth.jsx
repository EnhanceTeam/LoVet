import { UserAuth } from "../context/AuthContext"
import { LogoutRounded, PowerSettingsNew } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const { googleSignIn } = UserAuth()

  const handleLoginClick = (e) => {
    e.preventDefault()

    googleSignIn()
  }

  return <button onClick={handleLoginClick}>Login with Google</button>
}

const Logout = (e) => {
  const { logout } = UserAuth()
  const navigate = useNavigate()

  const handleLogoutClick = (e) => {
    e.preventDefault()

    logout()

    navigate("/")
  }

  return (
    <>
      <div className="flex justify-content-center">
        <IconButton onClick={handleLogoutClick}>
          <LogoutRounded />
        </IconButton>
      </div>
    </>
  )
}

export { Login, Logout }
