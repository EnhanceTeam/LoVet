import { useState } from "react"
import NavItem from "./NavItem"

export default function NavBar() {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true)

  const handleNavbarCollapse = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed)
  }

  return (
    <nav className="sticky top-0 px-8 bg-primary-container z-10">
      <div className="flex flex-wrap justify-between items-center">
        <a href="https://lovet.site">
          <img
            src="assets/svg/lovet_logo_horizontal_transparent.svg"
            alt="Lovet logo"
            className="h-14"
          />
        </a>
        <div className="flex">
          <ul className="hidden md:flex flex-row">
            <NavItem href="/#home" label="Beranda" />
            <NavItem href="/#TentangLovet" label="Tentang LoVet" />
            <NavItem href="/#why-us" label="Mengapa LoVet" />
            <NavItem href="/#Partner" label="Partner" />
            <NavItem href="/#service" label="Layanan" />
          </ul>
          <button
            type="button"
            onClick={handleNavbarCollapse}
            className="md:hidden"
          >
            <img
              src={`${
                isNavbarCollapsed
                  ? "assets/svg/hamburger_icon.svg"
                  : "assets/svg/close_icon.svg"
              }`}
              alt=""
              className="w-6"
            />
          </button>
        </div>
      </div>
      <div
        id="navbar-sticky"
        className={`${
          isNavbarCollapsed ? "hidden" : "flex"
        } md:hidden justify-center text-center md:w-auto`}
      >
        <ul className="flex flex-col md:flex-row gap-y-4 p-4">
          <NavItem href="#home" label="Beranda" />
          <NavItem href="#TentangLovet" label="Tentang LoVet" />
          <NavItem href="#why-us" label="Mengapa LoVet" />
          <NavItem href="#" label="Partner" />
          <NavItem href="#" label="Layanan" />
        </ul>
      </div>
    </nav>
  )
}
