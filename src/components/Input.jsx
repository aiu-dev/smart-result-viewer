import styled from "styled-components";

const StyledInput = styled.input`
padding:8px;
margin:5px;
border:1px solid #ccc;
border-radius:4px;
`;

function Input(props){
return <StyledInput {...props}/>
}

export default Input;
