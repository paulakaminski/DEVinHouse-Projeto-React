import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validEmail, validPassword } from "../Utils/Regex";
import "./FormularioLogin.css";

export default function FormLogin() {
  
  //Setar dados do formulário
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  function updateForm(key, value) {
    let newData = { ...form };
    newData[key] = value;
    setForm(newData);
  }

  //Setar status dos campos para validação
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const navigate = useNavigate();

  //Função a ser executada no envio do formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log(form);
    alert("Usuário logado!");
    navigate("/mapa");
  };

  //Validação dos dados informados pelo usuário
  function validate() {
    if (!form.email)
      return setStatus({
        type: "error",
        mensagem: "Necessário preencher o campo e-mail!",
      });

    if (!validEmail.test(form.email))
      return setStatus({
        type: "error",
        mensagem: "Informe um e-mail válido!",
      });

    if (!form.senha)
      return setStatus({
        type: "error",
        mensagem: "Necessário preencher o campo senha!",
      });
    if (!validPassword.test(form.senha))
      return setStatus({
        type: "error",
        mensagem:
          "Sua senha deve conter no mínimo 8 caracteres e possuir letras e números!",
      });

    return true;
  }

  //Direcionamento para tela de cadastro de usuário
  const cadastro = (e) => {
    navigate("/cadastro-usuario");
  };

  return (
    <>
      <div className="container-login">
        <div className="box-login">
          <div className="d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit}>
              <div className="content-login">
                <h3>LOGIN</h3>
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
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="InputPassword">Senha</label>
                  <input
                    id="input-password"
                    type="password"
                    className="form-control"
                    value={form.senha}
                    onChange={(e) => updateForm("senha", e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Entrar
                </button>
              </div>
              <p className="link-cadastro" onClick={cadastro}>
                Ainda não tem uma conta? Cadastre-se
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
