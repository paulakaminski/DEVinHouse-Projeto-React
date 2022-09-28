import { useNavigate } from "react-router-dom";
import logo from "../img/logo-farmacia.png"
import "./Navbar.css";

export default function NavbarLogin() {
  const navigate = useNavigate();

  function login() {
    navigate("/login");
  }

  return (
    <header>
      <div className="container" id="nav-container">
        <nav className="navbar navbar-expand-lg fixed-top">
          <a href="#" className="navbar-brand" onClick={login}>
            <img
              src="https://images.vexels.com/media/users/3/136559/isolated/preview/624dd0a951a1e8a118215b1b24a0da59-logotipo-da-farmacia.png"
              width="40"
              height="40"
              alt="DEVinPharmacy"
            />
            DEVinPharmacy
          </a>
        </nav>
      </div>
    </header>
  );
}
