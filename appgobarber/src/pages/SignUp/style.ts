import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 64px 32px ${Platform.OS === 'android' ? 160 : 40}px;
`;

export const Title = styled.Text`
  margin: 24px 0 16px;
  color: #f4ede8;
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
`;

export const BackToSignIn = styled.TouchableOpacity`
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

export const BackToSignInText = styled.Text`
  color: #f4ede8;
  margin-left: 16px;
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
`;
