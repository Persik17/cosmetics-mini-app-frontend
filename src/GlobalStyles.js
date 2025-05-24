import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    background-color: var(--tg-theme-bg-color, #f8f9fa);
    color: var(--tg-theme-text-color, #000);
    padding-bottom: 60px; /* Add padding to the bottom */
  }

  h1 {
    text-align: center;
    color: #e91e63;
    margin-bottom: 20px;
  }

  /* General styles */
  * {
    box-sizing: border-box;
  }

  body, html {
    font-family: 'Roboto', sans-serif;
    background-color: #f5f5f5;
    color: #333;
  }

  .MuiDialog-paper {
    border-radius: 12px;
  }
`;

export default GlobalStyle;