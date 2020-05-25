import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 56px;
  border-radius: 8px;
  background-color: #ff9000;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 16px;
`;
