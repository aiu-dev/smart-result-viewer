import styled from "styled-components";

const Button = styled.button`
  padding:8px 12px;
  margin:10px;
`;

function ThemeToggle({toggle}){

return(
<Button onClick={toggle}>
Toggle Theme
</Button>
)

}

export default ThemeToggle
