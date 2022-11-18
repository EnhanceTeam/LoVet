import fb from "./services/firebase"
import { Login, Logout } from "./views/Auth"
import ChatRoom from "./views/ChatRoom"
import './App.css'

const App = () => {
    const [user] = fb.useAuthState(fb.auth)

    return (
        <>
            <section>{user ? <ChatRoom /> : <Login />}</section>
        </>
    )
}

export default App
