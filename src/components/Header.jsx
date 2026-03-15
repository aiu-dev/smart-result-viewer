import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: ${props => props.theme.card};
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 0;
`;

const ThemeButton = styled.button`
  padding: 8px 12px;
  border: none;
  background: ${props => props.theme.primary};
  color: white;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

function Header({ toggleTheme }) {
  return (
    <HeaderContainer>
      <Title>Smart Task Manager</Title>

      <ThemeButton onClick={toggleTheme}>
        Toggle Theme
      </ThemeButton>
    </HeaderContainer>
  );
}

export default Header;
