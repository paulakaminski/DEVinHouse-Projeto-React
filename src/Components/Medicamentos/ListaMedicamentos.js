import { useState, useEffect } from "react";
import Modal from "./Modal";
import "./Medicamentos.css";

export default function ListaMedicamentos() {
  
  //Setar a lista de medciamentos com os dados do json server
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/medicamentos")
      .then((response) => response.json())
      .then((data) => {
        setMedicamentos(data);
        setFiltro(data);
      });
  }, []);

  //Filtro para atualizar a lista conforme a busca de medicamentos
  const [filtrado, setFiltro] = useState([medicamentos]);

  //Usestate para controlar os dados enviados na busca do usuario
  const [termo, setTermo] = useState("");

  //UseEffect que será executado sempre que houver alguma mudança na variável termo da busca
  useEffect(() => {
    setFiltro(
      medicamentos.filter((item) => {
        if (
          item.medicamento
            .toLocaleLowerCase()
            .indexOf(termo.toLocaleLowerCase()) !== -1
        ) {
          return item;
        }
      })
    );
  }, [termo]);

  //Setar modal de detalhes do medicamento
  const [modal, setModal] = useState(false);
  const [tempMedicamento, setTempMedicamento] = useState([]);

  const getMedicamento = (
    medicamento,
    dosagem,
    laboratorio,
    tipo,
    preco,
    descricao
  ) => {
    let tempMedicamento = [
      { medicamento, dosagem, laboratorio, tipo, preco, descricao },
    ];
    setTempMedicamento(...tempMedicamento);

    console.log(tempMedicamento);

    return setModal(true);
  };

  return (
    <>
      <div id="lista-medicamentos">
        <h3>Medicamentos</h3>
        <div className="row justify-content-center align-item-center">
          <input
            id="busca-medicamentos"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Digite o nome do medicamento que deseja buscar..."
          ></input>
        </div>
        <section className="py-4 py-lg-5 container">
          <div className="row justify-content-center align-item-center">
            {filtrado.map((item, index) => (
              <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4" key={index}>
                <div
                  className="card p-0 overflow-hidden h-100 shadow"
                  onClick={() =>
                    getMedicamento(
                      item.medicamento,
                      item.dosagem,
                      item.laboratorio,
                      item.tipo,
                      item.preco,
                      item.descricao
                    )
                  }
                >
                  <img
                    className="card-img-top"
                    alt="Imagem"
                    src="https://thumbs.dreamstime.com/b/frasco-de-medicamentos-e-comprimidos-%C3%ADcone-preto-branco-ilustra%C3%A7%C3%A3o-vetorial-eps-157890943.jpg"
                  ></img>
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.medicamento} {item.dosagem}
                    </h5>
                    <p className="card-text">{item.laboratorio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {modal === true ? (
        <Modal
          medicamento={tempMedicamento.medicamento}
          dosagem={tempMedicamento.dosagem}
          tipo={tempMedicamento.tipo}
          preco={tempMedicamento.preco}
          descricao={tempMedicamento.descricao}
          hide={() => setModal(false)}
        />
      ) : (
        ""
      )}
    </>
  );
}
