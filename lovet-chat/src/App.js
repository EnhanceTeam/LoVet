import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import "dayjs/locale/id"
import "./App.css"
import { AuthContextProvider } from "./context/AuthContext"
import Menu from "./views/Menu"
import ChatRoom from "./views/ChatRoom/ChatRoom"
import NotFound from "./views/NotFound/NotFound"
import LandingPage from "./views/LandingPage/LandingPage"
import { ThemeProvider } from "@emotion/react"
import { theme } from "./themes/theme"
import BookingPage from "./views/BookingPage/BookingPage"
import PaymentPage from "./views/BookingPage/PaymentPage"
import AfterPayment from "./views/BookingPage/AfterPayment"

const App = () => {
  // todo: user tidak bisa akses chatroom user lain dan chatroom generator

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
        <Router>
          <AuthContextProvider>
            <Routes>
              <Route index element={<LandingPage />} />
              <Route path="menu" element={<Menu />} />
              <Route path="menu/chatroom/:roomID" element={<ChatRoom />} />
              <Route path="booking" element={<BookingPage />} />
              <Route path="payment/:paymentID" element={<PaymentPage />} />
              <Route path="afterPayment" element={<AfterPayment />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthContextProvider>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
