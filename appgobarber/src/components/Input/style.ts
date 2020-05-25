import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
  hasError: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  background: #232129;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 2px solid #232129;

  ${(props) =>
    props.hasError &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  margin: 0 8px;
`;
