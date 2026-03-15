import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`

body{
font-family: Arial;
background:#f5f6fa;
margin:0;
padding:20px;
}

table{
width:100%;
border-collapse:collapse;
margin-top:20px;
}

th,td{
padding:10px;
border:1px solid #ddd;
text-align:center;
}

button{
margin:3px;
}

`;

export default GlobalStyle;
