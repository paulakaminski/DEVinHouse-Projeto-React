import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  function login() {
    navigate("/login");
  }

  function consultaFilial() {
    navigate("/mapa");
  }

  function cadastraFilial() {
    navigate("/cadastro-filial");
  }

  function consultaMedicamento() {
    navigate("/lista-medicamentos");
  }

  function cadastraMedicamento() {
    navigate("/cadastro-medicamento");
  }

  return (
    <>
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
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbar-links"
            >
              <div className="navbar-nav">
                <a
                  className="nav-item nav-link"
                  id="farmacias-menu"
                  href="#"
                  onClick={consultaFilial}
                >
                  Filiais
                </a>
                <a
                  className="nav-item nav-link"
                  id="cadastro-filial-menu"
                  href="#"
                  onClick={cadastraFilial}
                >
                  Cadastrar Filial
                </a>
                <a
                  className="nav-item nav-link"
                  id="medicamentos-menu"
                  href="#"
                  onClick={consultaMedicamento}
                >
                  Medicamentos
                </a>
                <a
                  className="nav-item nav-link"
                  id="cadastro-medicamento-menu"
                  href="#"
                  onClick={cadastraMedicamento}
                >
                  Cadastrar Medicamento
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
