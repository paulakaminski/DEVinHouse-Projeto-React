import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../../Pages/Login/Login";
import Mapa from "../../Pages/Farmacias/Mapa";
import CadastroFarmacias from "../../Pages/Farmacias/CadastroFarmacias";
import Medicamentos from "../../Pages/Medicamentos/Medicamentos";
import CadastroMedicamentos from "../../Pages/Medicamentos/CadastroMedicamentos";
import CadastroUsuario from "../../Pages/Cadastro/Cadastro";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/cadastro-filial" element={<CadastroFarmacias />} />
        <Route path="/lista-medicamentos" element={<Medicamentos />} />
        <Route path="/cadastro-medicamento" element={<CadastroMedicamentos />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
