import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Farmacias.css";

export default function MapaComponent() {
  const [filiais, setFiliais] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/filiais")
      .then((response) => response.json())
      .then((dados) => setFiliais(dados));
  }, []);

  return (
    <div className="container-mapa">
      <div className="mapa-content">
        <h3>Mapa de Filiais</h3>
        <MapContainer
          center={[-26.241814, -48.933141]}
          zoom={8}
          scrollWheelZoom={true}
          style={{ height: "500px", width: "800px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filiais.map((item) => (
            <Marker position={[item.latitude, item.longitude]}>
              <Popup>
                <h6>
                  <strong>{item.nomeFantasia}</strong>
                </h6>
                <p>Razão Social: {item.razaoSocial}</p>
                <p>CNPJ: {item.cnpj}</p>
                <p>E-mail: {item.email}</p>
                {item.telefone && <p>Telefone: {item.telefone}</p>}
                <p>Celular: {item.celular}</p>
                <p>
                  Endereço: {item.logradouro}, nº {item.numero},{" "}
                  {item.complemento}
                </p>
                <p>Bairro: {item.bairro}</p>
                <p>Cidade: {item.localidade}</p>
                <p>Estado: {item.uf}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
