import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, BackToSignIn, BackToSignInText } from './style';

import logoImg from '../../assets/logo.png';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório.'),
      email: Yup.string()
        .required('E-mail é obrigatório')
        .email('Informe um e-mail válido'),
      password: Yup.string().min(6, 'Mínimo 6 dígitos'),
      passwordConfirmation: Yup.string()
        .required('Confirmação necessária')
        .oneOf([Yup.ref('password')], 'Senhas não conferem'),
    });

    try {
      await schema.validate(data, { abortEarly: false });

      await api.post('/users', data);

      Alert.alert(
        'Cadastro realizado com sucesso',
        'Você já pode fazer login na aplicação',
      );

      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        Alert.alert(
          'Erro de validação',
          'Por favor verifique os dados informados',
        );
      }

      Alert.alert('Erro de cadastro', err.response.data.error);
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                icon="user"
                name="name"
                placeholder="Nome completo"
                autoCorrect
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />

              <Input
                ref={emailInputRef}
                icon="at-sign"
                name="email"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={passwordInputRef}
                icon="lock"
                name="password"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordConfirmationInputRef.current?.focus()
                }
              />

              <Input
                ref={passwordConfirmationInputRef}
                icon="check"
                name="passwordConfirmation"
                placeholder="Confirmação de senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef?.current?.submitForm()}
              />

              <Button onPress={() => formRef?.current?.submitForm()}>
                Cadastrar
              </Button>
            </Form>
          </Container>

          <BackToSignIn
            activeOpacity={0.95}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="arrow-left" size={16} color="#f4ede8" />
            <BackToSignInText>Voltar para logon</BackToSignInText>
          </BackToSignIn>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
