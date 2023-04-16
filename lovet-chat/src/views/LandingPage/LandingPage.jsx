import React from "react"
import NavBar from "../Common/Components/NavBar"
import Home from "./Components/Home"
import Partner from "./Components/Partner"
import TentangLovet from "./Components/TentangLovet"
import WhyUs from "./Components/WhyUs/WhyUs"
import Service from "./Components/Service"
import Footer from "../Common/Components/Footer"

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
      <Footer />
    </>
  )
}

export default LandingPage
