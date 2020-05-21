import styled from 'styled-components';
import { shade } from 'polished';

const Container = styled.button`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  margin-top: 16px;
  border-radius: 8px;
  background-color: #ff9000;
  color: #312e38;
  border: 0;
  font-weight: 500;

  transition: 0.3s;

  &:hover {
    background-color: ${shade(0.2, '#ff9000')};
  }
`;

export default Container;
