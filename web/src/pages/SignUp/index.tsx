import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { FiCheck, FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, AnimationContainer, Content, Background } from './styles';

import logo from '../../assets/logo.svg';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUP: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório.'),
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Necessário e-mail válido'),
        password: Yup.string().min(6, 'Mínimo 6 dígitos'),
        passwordConfirmation: Yup.string()
          .required('Confirmação necessária')
          .oneOf([Yup.ref('password')], 'Senha não confere'),
      });

      try {
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer seu Logon',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro',
          description: err.response.data.error,
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="Go Barber" />

          <h1>Faça seu cadastro</h1>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" icon={FiUser} placeholder="Nome completo" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Input
              name="passwordConfirmation"
              icon={FiCheck}
              type="password"
              placeholder="Confirmar Senha"
            />

            <Button type="submit">Criar conta</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Já possuo cadastro
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUP;
