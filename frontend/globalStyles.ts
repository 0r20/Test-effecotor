import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

export const globalStyles = css`
  ${emotionReset}
  
  body {
    font-family: "Alegreya Sans", "Open Sans", sans-serif;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    overflow: hidden;
  }

  #__next {
    display: flex;
    flex-direction: row;
  }
`;

