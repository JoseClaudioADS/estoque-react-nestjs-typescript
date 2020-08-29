import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-block;
`;

interface LogoutButtonProps {
  show: boolean;
}

export const LogoutButton = styled.button<LogoutButtonProps>`
  color: white;
  border-radius: 4px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  background: rgb(202, 60, 60);
  display: ${(props) => (props.show ? 'inline' : 'none')};
`;
