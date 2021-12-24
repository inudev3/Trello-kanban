import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  ${reset};
  *, html, body{
    font-family: 'Source Sans Pro', sans-serif;
    box-sizing: border-box;
    ${({ theme }) => css`
      background-color: ${theme.background.primary};
      color: ${theme.color.primary};
    `}
`;
