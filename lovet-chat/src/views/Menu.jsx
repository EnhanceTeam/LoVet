import { Login } from "./Auth"
import { UserAuth } from "../context/AuthContext"
import ChatRoomGenerator from "./ChatRoomGenerator"
import JoinRoom from "./JoinRoom"

const Menu = () => {
  // todo: if none login, return login form
  // todo: if admin login, return chat room generator
  // todo: if user login, return join chat room with room id form

  // const [user] = fb.useAuthState(fb.auth)
  const { user } = UserAuth()

  if (!user) {
    return <Login />
  } else {
    if (user.uid === "aC0zKtkpqgZY7MBI3QaCppjXvYE3") {
      return <ChatRoomGenerator />
    } else {
      // todo: return user page
      return <JoinRoom />
    }
  }
}

export default Menu
