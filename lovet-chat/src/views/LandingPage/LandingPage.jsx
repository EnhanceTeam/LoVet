import React from "react"
import NavBar from "../Common/Components/NavBar"
import Home from "./Components/Home"
import Partner from "./Components/Partner"
import TentangLovet from "./Components/TentangLovet"
import WhyUs from "./Components/WhyUs/WhyUs"
import Service from "./Components/Service"

const LandingPage = () => {
  // window.location.href = "https://lovetindonesia.wixsite.com/home"
  return (
    <>
      <NavBar />
      <Home />
      <TentangLovet />
      <WhyUs />
      <Partner />
      <Service />
    </>
  )
}

export default LandingPage
