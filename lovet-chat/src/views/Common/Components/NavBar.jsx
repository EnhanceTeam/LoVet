import "./bootstrap.scss"

export default function NavBar() {
  return (
    <header className="sticky top-0">
      <div className="navbar">
        <div className="nav-brand">
          <img
            className="nav-logo"
            src="assets/svg/lovet_logo_horizontal_transparent.svg"
            alt="Lovet logo"
          />
        </div>
        <div className="nav-menu">
          <a className="nav-link" href="#home">
            Beranda
          </a>
          <a className="nav-link" href="#">
            Tentang LoVet
          </a>
          <a className="nav-link" href="#">
            Mengapa LoVet
          </a>
          <a className="nav-link" href="#">
            Partner
          </a>
          <a className="nav-link" href="#">
            Layanan
          </a>
        </div>
      </div>
    </header>
  )
}
