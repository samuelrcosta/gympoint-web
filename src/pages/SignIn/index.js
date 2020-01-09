import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';
import Button from '../../components/Button';

import logo from '../../assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('Insira o e-mail'),
  password: Yup.string().required('Insira a senha'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">Seu e-mail</label>
        <Input name="email" type="email" placeholder="exemplo@email.com" />

        <label htmlFor="password">Sua senha</label>
        <Input name="password" type="password" placeholder="*********" />

        <Button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </Button>
      </Form>
    </>
  );
}
