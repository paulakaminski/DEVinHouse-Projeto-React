import { useState, useEffect } from "react";
import { validEmail, validCnpj } from "../Utils/Regex";
const ACCESS_TOKEN_MAPBOX = `access_token=pk.eyJ1IjoicGF1bGFrYW1pbnNraSIsImEiOiJjbDg5eDk5ZmQwYmF5M3ZxdWluMDg4Ynp5In0.SuToX2xrSRLfyEXycbR9Eg`;

export default function FormularioFilial() {
  const [filial, setFilial] = useState({});

  //Buscar os dados do endereço da API
  function getAdress() {
    fetch(`https://viacep.com.br/ws/${filial.cep}/json/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const logradouro = data.logradouro;
        const bairro = data.bairro;
        const localidade = data.localidade;
        const uf = data.uf;
        setFilial((prev) => ({
          ...prev,
          logradouro,
          bairro,
          localidade,
          uf,
        }));
      });
  }

  //Mostrar os dados do endereço na tela
  useEffect(() => {
    // é necessário fazer uma vadição para não chamar a API sem o CEP, por exemplo
    if (filial.cep === undefined) return
    if (filial.cep.length === 8) {
      getAdress();
    }
  }, [filial.cep]);

  //Buscar os dados de latitude e longitude da API
  function getMapBox() {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${filial.logradouro}.json?${ACCESS_TOKEN_MAPBOX}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const latitude = data.features[0].center[1];
        const longitude = data.features[0].center[0];
        setFilial((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));
      });
  }

  //Mostrar os dados de latitude e longitude na tela
  useEffect(() => {
    // é necessário fazer uma vadição para não chamar a API sem o logradouro, por exemplo
    if (filial.logradouro === undefined) return
    if (filial.logradouro.length > 0) {
      getMapBox();
    }
  }, [filial.logradouro]);

  //Setar status dos campos para validação
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  //Função a ser executada no envio do formulario
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    console.log(filial);

    fetch("http://localhost:3000/filiais", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filial),
    });

    alert("Filial cadastrada com sucesso!");

    setFilial = {
      razaoSocial: "",
      cnpj: "",
      nomeFantasia: "",
      email: "",
      telefone: "",
      celular: "",
      cep: "",
      numero: "",
      complemento: "",
    };
  }

  //Validação dos dados informados pelo usuário
  function validate() {
    if (!filial.razaoSocial)
      return setStatus({
        type: "errorRazaoSocial",
        mensagem: "Campo obrigatório!",
      });

    if (!filial.cnpj)
      return setStatus({
        type: "errorCnpj",
        mensagem: "Campo obrigatório!",
      });

      // essa validação de cnpj não me permitia criar uma nova filial
      // criar validação de cnpj
      // if (!validCnpj(filial.cnpj))
      // return setStatus({
      //   type: "errorCnpj",
      //   mensagem: "Informe um CNPJ válido!",
      // });

    if (!filial.nomeFantasia)
      return setStatus({
        type: "errorNomeFantasia",
        mensagem: "Campo obrigatório!",
      });

    if (!filial.email)
      return setStatus({
        type: "errorEmail",
        mensagem: "Campo obrigatório!",
      });

    if (!validEmail.test(filial.email))
      return setStatus({
        type: "errorEmail",
        mensagem: "Informe um e-mail válido!",
      });

    if (!filial.celular)
      return setStatus({
        type: "errorCelular",
        mensagem: "Campo obrigatório!",
      });

    if (!filial.cep)
      return setStatus({
        type: "errorCep",
        mensagem: "Campo obrigatório!",
      });

    if (!filial.logradouro)
      return setStatus({
        type: "errorLogradouro",
        mensagem: "Campo obrigatório!",
      });

    if (!filial.numero)
      return setStatus({
        type: "errorNumero",
        mensagem: "Campo obrigatório!",
      });

    if (!filial.bairro)
      return setStatus({
        type: "errorBairro",
        mensagem: "Campo obrigatório!",
      });

    if (!filial.localidade)
      return setStatus({
        type: "errorLocalidade",
        mensagem: "Campo obrigatório!",
      });

    if (!filial.uf)
      return setStatus({
        type: "errorUf",
        mensagem: "Campo obrigatório!",
      });

    return true;
  }

  return (
    <div className="cadastro-filial">
      <h3>Cadastro de Filial</h3>
      <div className="container-farmacia">
        <div className="box-farmacia">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-4">
              <label htmlFor="inputRazaoSocial" className="form-label">
                Razão Social
              </label>
              <input
                type="text"
                className="form-control"
                id="inputRazaoSocial"
                value={filial.razaoSocial}
                onChange={(e) =>
                  setFilial({ ...filial, razaoSocial: e.target.value })
                }
              />
              {status.type === "errorRazaoSocial" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-4">
              <label htmlFor="inputCNPJ" className="form-label">
                CNPJ
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCNPJ"
                value={filial.cnpj}
                onChange={(e) => setFilial({ ...filial, cnpj: e.target.value })}
              />
              {status.type === "errorCnpj" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-4">
              <label htmlFor="inputNomeFantasia" className="form-label">
                Nome Fantasia
              </label>
              <input
                type="text"
                className="form-control"
                id="inputNomeFantasia"
                value={filial.nomeFantasia}
                onChange={(e) =>
                  setFilial({ ...filial, nomeFantasia: e.target.value })
                }
              />
              {status.type === "errorNomeFantasia" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-4">
              <label htmlFor="inputEmailFilial" className="form-label">
                E-mail
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEmailFilial"
                value={filial.email}
                onChange={(e) =>
                  setFilial({ ...filial, email: e.target.value })
                }
              />
              {status.type === "errorEmail" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-4">
              <label htmlFor="inputTelefone" className="form-label">
                Telefone
              </label>
              <input
                type="text"
                className="form-control"
                id="inputTelefone"
                value={filial.telefone}
                onChange={(e) =>
                  setFilial({ ...filial, telefone: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputCelular" className="form-label">
                Celular
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCelular"
                value={filial.celular}
                onChange={(e) =>
                  setFilial({ ...filial, celular: e.target.value })
                }
              />
              {status.type === "errorCelular" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-12"></div>
            <div className="col-12"></div>
            <div className="col-3">
              <label htmlFor="inputCep" className="form-label">
                CEP
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCep"
                value={filial.cep}
                onChange={(e) => setFilial({ ...filial, cep: e.target.value })}
              />
              {status.type === "errorCep" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-7">
              <label htmlFor="inputLogradouro" className="form-label">
                Logradouro
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLogradouro"
                value={filial.logradouro}
                onChange={(e) =>
                  setFilial({ ...filial, logradouro: e.target.value })
                }
              />
              {status.type === "errorLogradpuro" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-2">
              <label htmlFor="inputNumero" className="form-label">
                Numero
              </label>
              <input
                type="text"
                className="form-control"
                id="inputNumero"
                value={filial.numero}
                onChange={(e) =>
                  setFilial({ ...filial, numero: e.target.value })
                }
              />
              {status.type === "errorNumero" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-4">
              <label htmlFor="inputBairro" className="form-label">
                Bairro
              </label>
              <input
                type="text"
                className="form-control"
                id="inputBairro"
                value={filial.bairro}
                onChange={(e) =>
                  setFilial({ ...filial, bairro: e.target.value })
                }
              />
              {status.type === "errorBairro" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-4">
              <label htmlFor="inputCidade" className="form-label">
                Cidade
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCidade"
                value={filial.localidade}
                onChange={(e) =>
                  setFilial({ ...filial, localidade: e.target.value })
                }
              />
              {status.type === "errorLocalidade" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-4">
              <label htmlFor="inputEstado" className="form-label">
                Estado
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEstado"
                value={filial.uf}
                onChange={(e) => setFilial({ ...filial, uf: e.target.value })}
              />
              {status.type === "errorUf" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {status.mensagem}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="inputComplemento" className="form-label">
                Complemento
              </label>
              <input
                type="text"
                className="form-control"
                id="inputComplemento"
                value={filial.complemento}
                onChange={(e) =>
                  setFilial({ ...filial, complemento: e.target.value })
                }
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputLatitude" className="form-label">
                Latitude
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLatitude"
                required
                disabled
                value={filial.latitude}
                onChange={(e) =>
                  setFilial({ ...filial, latitude: e.target.value })
                }
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputLongitude" className="form-label">
                Longitude
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLongitude"
                required
                disabled
                value={filial.longitude}
                onChange={(e) =>
                  setFilial({ ...filial, longitude: e.target.value })
                }
              />
            </div>
            <div className="col-1">
              <button type="reset" className="btn btn-primary">
                Limpar
              </button>
            </div>
            <div className="col-1">
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
