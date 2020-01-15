import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCheck, FaChevronLeft } from 'react-icons/fa';
import { Form as RCForm, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '../../../services/api';
import history from '../../../services/history';

import ContentHeader from '../../../components/ContentHeader';
import WhiteBlock from '../../../components/WhiteBlock';
import Button from '../../../components/Button';
import LoadingBlock from '../../../components/LoadingBlock';
import ContentForm from '../../../components/ContentForm';

const schema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('Campo obrigatório'),
  birth: Yup.date('Campo deve ser preenchido com uma data válida').required(
    'Campo obrigatório'
  ),
  weight: Yup.number('Campo deve ser um número')
    .positive('Campo deve ser um número positivo')
    .required('Campo obrigatório'),
  height: Yup.number('Campo deve ser um número')
    .positive('Campo deve ser um número positivo')
    .required('Campo obrigatório'),
});

export default function Form() {
  const id = useParams().id || null;
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formSending, setFormSending] = useState(false);

  async function loadStudentData() {
    if (id) {
      try {
        setLoading(true);
        const response = await api.get(`/students/${id}`);

        setStudent(response.data);
        setLoading(false);
      } catch (err) {
        toast.error('O aluno selecionado não existe.');
        history.push('/students');
      }
    }
  }

  useEffect(() => {
    if (id) {
      loadStudentData();
    }
  }, [id]); // eslint-disable-line

  async function handleSubmit(data) {
    try {
      setFormSending(true);

      if (id) {
        await api.put(`/students/${id}`, data);
        toast.success('Aluno editado com sucesso!');
      } else {
        await api.post('/students', data);
        toast.success('Aluno cadastrado com sucesso!');
      }

      history.push('/students');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Ocorreu um erro ao salvar o usuário, tente novamente.');
      }
      setFormSending(false);
    }
  }

  return (
    <RCForm onSubmit={handleSubmit} initialData={student} schema={schema}>
      <ContentHeader>
        <h1>{id ? 'Edição de aluno' : 'Cadastro de aluno'}</h1>

        <Button background="#CACBCC" link to="/students">
          <FaChevronLeft size={14} /> VOLTAR
        </Button>

        <Button type="submit" disabled={formSending}>
          <FaCheck size={14} /> SALVAR
        </Button>
      </ContentHeader>

      <WhiteBlock>
        {loading ? (
          <LoadingBlock size={30} height="40vh" />
        ) : (
          <ContentForm className="row">
            <div className="col-md-12">
              <label htmlFor="name">NOME COMPLETO</label>
              <Input name="name" />
            </div>

            <div className="col-md-12">
              <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
              <Input type="email" name="email" />
            </div>

            <div className="col-md-4">
              <label htmlFor="birth">DATA DE NASCIMENTO</label>
              <Input type="date" name="birth" />
            </div>

            <div className="col-md-4">
              <label htmlFor="weight">PESO (em Kg)</label>
              <Input type="number" name="weight" />
            </div>

            <div className="col-md-4">
              <label htmlFor="height">ALTURA (em cm)</label>
              <Input type="number" name="height" />
            </div>
          </ContentForm>
        )}
      </WhiteBlock>
    </RCForm>
  );
}
