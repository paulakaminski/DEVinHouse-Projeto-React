// import logo from "./logo.svg";
import "./App.css";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStyle } from "./Styles/Global";
import Rotas from "./Components/Rotas/Rotas";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <div>
      <Rotas>
        <Login />
      </Rotas>
      <GlobalStyle />
    </div>
  );
}

export default App;
