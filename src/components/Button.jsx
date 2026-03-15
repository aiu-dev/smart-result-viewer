import styled from "styled-components";

const StyledButton = styled.button`
padding:8px 12px;
background:#3498db;
color:white;
border:none;
border-radius:4px;
cursor:pointer;

:hover{
background:#2980b9;
}
`;

function Button({text,...props}){
return <StyledButton {...props}>{text}</StyledButton>
}

export default Button;
