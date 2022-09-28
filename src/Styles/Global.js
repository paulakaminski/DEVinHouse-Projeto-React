import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box
  }

  body {
    background-color: #f7f7f7;
  }

  button {
    cursor: pointer;
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
  }
`;
