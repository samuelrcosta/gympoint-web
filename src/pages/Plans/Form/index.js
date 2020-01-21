import React, { useState, useEffect, useMemo } from 'react';
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
  title: Yup.string().required('Campo obrigatório'),
  duration: Yup.number('Campo deve ser um número')
    .positive('Campo deve ser um número positivo')
    .required('Campo obrigatório'),
  price: Yup.number('Campo deve ser um número')
    .positive('Campo deve ser um número positivo')
    .required('Campo obrigatório'),
});

export default function Form() {
  const id = useParams().id || null;
  const [plan, setPlan] = useState(null);
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formSending, setFormSending] = useState(false);

  const totalPrice = useMemo(() => (price * duration).toFixed(2), [
    price,
    duration,
  ]);

  async function loadPlanData() {
    if (id) {
      try {
        setLoading(true);
        const response = await api.get(`/plans/${id}`);

        setPlan(response.data);
        setPrice(response.data.price);
        setDuration(response.data.duration);
        setLoading(false);
      } catch (err) {
        toast.error('O plano selecionado não existe.');
        history.push('/students');
      }
    }
  }

  useEffect(() => {
    if (id) {
      loadPlanData();
    }
  }, [id]); // eslint-disable-line

  async function handleSubmit(data) {
    try {
      setFormSending(true);

      if (id) {
        await api.put(`/plans/${id}`, data);
        toast.success('Plano editado com sucesso!');
      } else {
        await api.post('/plans', data);
        toast.success('Plano cadastrado com sucesso!');
      }

      history.push('/plans');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Ocorreu um erro ao salvar o plano, tente novamente.');
      }
      setFormSending(false);
    }
  }

  return (
    <RCForm onSubmit={handleSubmit} initialData={plan} schema={schema}>
      <ContentHeader>
        <h1>{id ? 'Edição de plano' : 'Cadastro de plano'}</h1>

        <Button background="#CACBCC" link to="/plans">
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
              <label htmlFor="title">TÍTULO DO PLANO</label>
              <Input name="title" />
            </div>

            <div className="col-md-4">
              <label htmlFor="duration">DURATION</label>
              <Input
                type="number"
                name="duration"
                onChange={e => setDuration(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="price">PREÇO MENSAL</label>
              <Input
                type="number"
                name="price"
                step="any"
                onChange={e => setPrice(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="height">PREÇO TOTAL</label>
              <Input type="number" name="height" readOnly value={totalPrice} />
            </div>
          </ContentForm>
        )}
      </WhiteBlock>
    </RCForm>
  );
}
