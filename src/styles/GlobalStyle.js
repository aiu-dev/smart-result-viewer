import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body{
  margin:0;
  background:${props => props.theme.bg};
  color:${props => props.theme.text};
  font-family:Arial;
}
`;
