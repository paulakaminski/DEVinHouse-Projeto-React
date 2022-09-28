import { useState } from "react";
import "./Medicamentos.css";

export default function FormularioMedicamento() {
  const [medicamento, setMedicamento] = useState({
    medicamento: "",
    laboratorio: "",
    dosagem: "",
    preco: "",
    descricao: "",
  });

  //Setar status dos campos para validação
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  //Função a ser executada no envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log(medicamento);
    alert("Medicamento incluído com sucesso!");
    // fetch("http://localhost:3000/medicamentos", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(medicamento),
    // });

    setMedicamento = {
      medicamento: "",
      laboratorio: "",
      dosagem: "",
      tipo: "",
      preco: "",
      descricao: "",
    };
  };

  //Validação dos dados informados pelo usuário
  function validate() {
    if (!medicamento.medicamento)
      return setStatus({
        type: "errorMedicamento",
        mensagem: "Campo obrigatório!",
      });

    if (!medicamento.laboratorio)
      return setStatus({
        type: "errorLaboratorio",
        mensagem: "Campo obrigatório!",
      });

    if (!medicamento.dosagem)
      return setStatus({
        type: "errorDosagem",
        mensagem: "Campo obrigatório!",
      });

    if (!medicamento.tipo)
      return setStatus({
        type: "errorTipo",
        mensagem: "Selecione uma opção!",
      });

    if (!medicamento.preco)
      return setStatus({
        type: "errorPreco",
        mensagem: "Campo obrigatório!",
      });

    if (!medicamento.descricao)
      return setStatus({
        type: "errorDescricao",
        mensagem: "Campo obrigatório!",
      });

    return true;
  }

  function reset() {
    setMedicamento = {
      medicamento: "",
      laboratorio: "",
      dosagem: "",
      tipo: "",
      preco: "",
      descricao: "",
    };
  }

  return (
    <div className="cadastro-medicamento">
      <h3>Cadastro de Medicamento</h3>
      <div className="container-medicamento">
        <div className="box-medicamento">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label htmlFor="inputMedicamento" className="form-label">
                Medicamento
              </label>
              <input
                type="text"
                className="form-control"
                id="inputMedicamento"
                value={medicamento.medicamento}
                onChange={(e) => {
                  setMedicamento((prev) => ({
                    ...prev,
                    medicamento: e.target.value,
                  }));
                }}
              />
              {status.type === "errorMedicamento" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="inputLaboratorio" className="form-label">
                Laboratório
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLaboratorio"
                value={medicamento.laboratorio}
                onChange={(e) => {
                  setMedicamento((prev) => ({
                    ...prev,
                    laboratorio: e.target.value,
                  }));
                }}
              />
              {status.type === "errorLaboratorio" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-4">
              <label htmlFor="inputDosagem" className="form-label">
                Dosagem
              </label>
              <input
                type="text"
                className="form-control"
                id="inputDosagem"
                value={medicamento.dosagem}
                onChange={(e) => {
                  setMedicamento((prev) => ({
                    ...prev,
                    dosagem: e.target.value,
                  }));
                }}
              />
              {status.type === "errorDosagem" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-4">
              <label htmlFor="inputTipo" className="form-label">
                Tipo
              </label>
              <select
                id="inputTipo"
                className="form-select"
                value={medicamento.tipo}
                defaultValue={"DEFAULT"}
                onChange={(e) => {
                  setMedicamento((prev) => ({
                    ...prev,
                    tipo: e.target.value,
                  }));
                }}
              >
                <option value="DEFAULT" disabled>
                  Selecione...
                </option>
                <option>Medicamento controlado</option>
                <option>Medicamento comum</option>
              </select>
              {status.type === "errorTipo" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-4">
              <label htmlFor="inputPreco" className="form-label">
                Preço Unitário
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPreco"
                value={medicamento.preco}
                onChange={(e) => {
                  setMedicamento((prev) => ({
                    ...prev,
                    preco: e.target.value,
                  }));
                }}
              />
              {status.type === "errorPreco" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-12">
              <label htmlFor="inputTextarea" className="form-label">
                Descrição
              </label>
              <textarea
                className="form-control"
                id="inputTextarea"
                rows="5"
                value={medicamento.descricao}
                onChange={(e) => {
                  setMedicamento((prev) => ({
                    ...prev,
                    descricao: e.target.value,
                  }));
                }}
              ></textarea>
              {status.type === "errorDescricao" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-2">
              <button type="reset" className="btn btn-primary" onClick={reset}>
                Limpar
              </button>
            </div>
            <div className="col-2">
              <button type="submit" className="btn btn-primary">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
