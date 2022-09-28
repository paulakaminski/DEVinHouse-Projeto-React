import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validEmail, validPassword } from "../Utils/Regex";
import "./CadastroUsuario.css";

export default function TelaCadastro() {

  //Setar os dados do usuário recebidos do formulário
  const [usuario, setUsuario] = useState({
    email: "",
    senha: "",
    confirmacaoSenha: "",
  });

  function updateUsuario(key, value) {
    let newData = { ...usuario };
    newData[key] = value;
    setUsuario(newData);
  }

  //Setar status dos campos para validação
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const navigate = useNavigate();

  //Função a ser executada no envio do formulário
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    alert("Usuário cadastrado com sucesso!");
    navigate("/mapa");
  }

  //Validação dos dados informados pelo usuário
  function validate() {
    if (!usuario.email)
      return setStatus({
        type: "error",
        mensagem: "Necessário preencher o campo e-mail!",
      });

    if (!validEmail.test(usuario.email))
      return setStatus({
        type: "error",
        mensagem: "Informe um e-mail válido!",
      });

    if (!usuario.senha)
      return setStatus({
        type: "error",
        mensagem: "Necessário preencher o campo senha!",
      });

    if (!validPassword.test(usuario.senha))
      return setStatus({
        type: "error",
        mensagem:
          "Sua senha deve conter no mínimo 8 caracteres e possuir letras e números!",
      });

    if (!usuario.confirmacaoSenha)
      return setStatus({
        type: "error",
        mensagem: "Necessário confirmar a senha!",
      });

    if (usuario.senha !== usuario.confirmacaoSenha)
      return setStatus({
        type: "error",
        mensagem: "As senhas devem ser iguais!",
      });

    return true;
  }

  //Direcionamento para tela de login
  const login = (e) => {
    navigate("/login");
  };

  return (
    <>
      <div className="container-cadastro-usuario">
        <div className="box-cadastro-usuario">
          <div className="d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit}>
              <div className="content-cadastro-usuario">
                <h3>CADASTRO</h3>
                {status.type === "error" ? (
                  <p style={{ color: "red", fontSize: "14px" }}>
                    {status.mensagem}
                  </p>
                ) : (
                  ""
                )}
                <div className="form-group">
                  <label htmlFor="InputEmail">E-mail</label>
                  <input
                    id="input-email"
                    type="text"
                    className="form-control"
                    value={usuario.email}
                    onChange={(e) => updateUsuario("email", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="InputPassword">Senha</label>
                  <input
                    id="input-password"
                    type="password"
                    className="form-control"
                    value={usuario.senha}
                    onChange={(e) => updateUsuario("senha", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="InputPassword">Confirmar Senha</label>
                  <input
                    id="input-confirm-password"
                    type="password"
                    className="form-control"
                    value={usuario.confirmacaoSenha}
                    onChange={(e) =>
                      updateUsuario("confirmacaoSenha", e.target.value)
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Cadastrar-se
                </button>
              </div>
              <p className="link-login" onClick={login}>
                Já tem uma conta? Entre
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
