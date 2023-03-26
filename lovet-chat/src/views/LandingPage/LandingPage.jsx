import React from "react"
import NavBar from "../Common/Components/NavBar"
import Home from "./Components/Home"
import TentangLovet from "./Components/TentangLovet"

const LandingPage = () => {
  // window.location.href = "https://lovetindonesia.wixsite.com/home"
  return (
    <>
      <NavBar />
      <Home />
      <TentangLovet />
    </>
  )
}

export default LandingPage
