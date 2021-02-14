import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

export const globalStyles = css`
  ${emotionReset}
  
  body {
    font-family: "Alegreya Sans", "Open Sans", sans-serif;
    height: 100vh;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    overflow: hidden;
  }

  #__next {
    height: 100vh;
    display: flex;
    flex-direction: row;
  }
`;

