import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import { AuthContextProvider } from "./context/AuthContext"
import Menu from "./views/Menu"
import ProtectedRoutes from "./views/ProtectedRoutes"
import ChatRoom from "./views/ChatRoom/ChatRoom"
import NotFound from "./views/NotFound/NotFound"
import LandingPage from "./views/LandingPage"
import { ThemeProvider } from "@emotion/react"
import { theme } from "./themes/theme"

const App = () => {
  // todo: user tidak bisa akses chatroom user lain dan chatroom generator

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}

export default App
