import styled from 'styled-components';

const Button = styled.button`
  color: white;
  border-radius: 4px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
`;

export const DeleteButton = styled(Button)`
  background: rgb(202, 60, 60);
`;

export const EditButton = styled(Button)`
  background: rgb(66, 184, 221);
  margin-right: 5px;
`;
