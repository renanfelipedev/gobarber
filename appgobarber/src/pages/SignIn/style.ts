import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 32px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  margin: 36px 0 24px;
  color: #f4ede8;
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 16px;
`;

export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const CreateAccount = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;

  padding: 16px 0 ${16 + getBottomSpace()}px;

  border-top-width: 3px;
  border-top-color: #232129;

  background-color: #312e38;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CreateAccountText = styled.Text`
  color: #ff9000;
  margin-left: 16px;
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
`;
