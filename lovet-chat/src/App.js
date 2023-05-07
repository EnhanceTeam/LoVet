import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import { AuthContextProvider } from "./context/AuthContext"
import Menu from "./views/Menu"
import ProtectedRoutes from "./views/ProtectedRoutes"
import ChatRoom from "./views/ChatRoom/ChatRoom"
import NotFound from "./views/NotFound/NotFound"
import LandingPage from "./views/LandingPage"
import { ReactSession } from "react-client-session"

const App = () => {
  ReactSession.setStoreType("sessionStorage")

  // todo: user tidak bisa akses chatroom user lain dan chatroom generator

  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="menu" element={<Menu />} />
          <Route
            path="menu/chatroom/:roomID"
            element={
              <ProtectedRoutes>
                <ChatRoom />
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  )
}

export default App
