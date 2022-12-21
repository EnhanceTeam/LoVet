import fb from "../services/firebase"
import { Login } from "./Auth/Auth"
import { UserAuth } from "../context/AuthContext"
import ChatRoomGenerator from "./ChatRoomGenerator"
import JoinRoom from "./JoinRoom/JoinRoom"

const Menu = () => {
  // todo: if none login, return login form
  // todo: if admin login, return chat room generator
  // todo: if user login, return join chat room with room id form

  // const [user] = fb.useAuthState(fb.auth)
  const { user } = UserAuth()

  if (!user) {
    return <Login />
  } else {
    if (user.uid === "oqua3QCSZjdIKUWQlDagvanOR8v2") {
      return <ChatRoomGenerator />
    } else {
      // todo: return user page
      return <JoinRoom />
    }
  }
}

export default Menu
