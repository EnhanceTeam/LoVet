import React from "react"
import NavBar from "../Common/Components/NavBar"
import Home from "./Components/Home"
import WhyUs from "./WhyUs/WhyUs"

const LandingPage = () => {
  // window.location.href = "https://lovetindonesia.wixsite.com/home"
  return (
    <>
      <NavBar />
      <Home />
      <WhyUs />
    </>
  )
}

export default LandingPage
