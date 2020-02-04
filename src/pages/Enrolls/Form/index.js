import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCheck, FaChevronLeft } from 'react-icons/fa';
import { parseISO, format, addMonths } from 'date-fns';

import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../utils/format';

import ContentHeader from '../../../components/ContentHeader';
import WhiteBlock from '../../../components/WhiteBlock';
import Button from '../../../components/Button';
import LoadingBlock from '../../../components/LoadingBlock';
import ContentForm from '../../../components/ContentForm';

const asyncSelectStyles = {
  control: styles => ({
    ...styles,
    borderColor: 'rgba(0,0,0,0.1)',
    height: '44px',
  }),
};

export default function Form() {
  const id = useParams().id || null;
  const [enroll, setEnroll] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [students, setStudents] = useState('');
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  async function loadEnrollData() {
    if (id) {
      try {
        setLoading(true);
        const response = await api.get(`/enrolls/${id}`);

        setEnroll(response.data);
        setSelectedPlan({
          label: response.data.plan.title,
          value: response.data.plan.id,
        });
        setSelectedStudent({
          label: response.data.student.name,
          value: response.data.student.id,
        });
        setStartDate(
          format(
            parseISO(response.data.start_date),
            "yyyy'-'MM'-'dd"
          ).toString()
        );
        setLoading(false);
      } catch (err) {
        toast.error('A matrícula selecionada não existe.');
        history.push('/enrolls');
      }
    }
  }

  useEffect(() => {
    if (id) {
      loadEnrollData();
    }
  }, [id]); // eslint-disable-line

  useEffect(() => {
    if (selectedPlan && startDate) {
      const searchPlan = plans.filter(plan => selectedPlan.value === plan.id);
      if (searchPlan.length === 0) return;
      const p = searchPlan[0];
      setEndDate(
        format(addMonths(parseISO(startDate), p.duration), "dd'/'MM'/'yyyy")
      );
      setTotalPrice(formatPrice(p.price * p.duration));
    }
  }, [plans, selectedPlan, startDate, totalPrice]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      plan_id: selectedPlan.value,
      start_date: startDate,
      student_id: selectedStudent.value,
    };

    try {
      setFormSending(true);

      if (id) {
        await api.put(`/enrolls/${id}`, data);
        toast.success('Matrícula editada com sucesso!');
      } else {
        await api.post('/enrolls', data);
        toast.success('Matrícula cadastrada com sucesso!');
      }

      history.push('/enrolls');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Ocorreu um erro ao salvar a matrícula, tente novamente.');
      }
      setFormSending(false);
    }
  }

  async function loadStudents(inputValue) {
    let stds = students;

    if (stds.length === 0) {
      const response = await api.get(`/students`);

      setStudents(response.data);

      stds = response.data;
    }

    return new Promise(resolve => {
      resolve(
        stds
          .map(student => ({
            value: student.id,
            label: student.name,
          }))
          .filter(student =>
            student.label.toLowerCase().includes(inputValue.toLowerCase())
          )
      );
    });
  }

  async function loadPlans(inputValue) {
    let currentPlans = plans;

    if (currentPlans.length === 0) {
      const response = await api.get(`/plans`);

      setPlans(response.data);

      currentPlans = response.data;
    }

    return new Promise(resolve => {
      resolve(
        currentPlans
          .map(plan => ({
            value: plan.id,
            label: plan.title,
          }))
          .filter(plan =>
            plan.label.toLowerCase().includes(inputValue.toLowerCase())
          )
      );
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <ContentHeader>
        <h1>{id ? 'Edição de matrícula' : 'Cadastro de matrícula'}</h1>

        <Button background="#CACBCC" link to="/enrolls">
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
              <label htmlFor="name">ALUNO</label>
              <AsyncSelect
                cacheOptions
                loadOptions={value => loadStudents(value)}
                defaultOptions
                defaultValue={
                  enroll
                    ? { label: enroll.student.name, value: enroll.student.id }
                    : ''
                }
                styles={asyncSelectStyles}
                value={selectedStudent}
                isDisabled={!!id}
                onChange={value => setSelectedStudent(value)}
              />
            </div>

            <div className="col-md-3 mt-2">
              <label htmlFor="plan">PLANO</label>
              <AsyncSelect
                cacheOptions
                loadOptions={value => loadPlans(value)}
                defaultOptions
                defaultValue={selectedPlan}
                styles={asyncSelectStyles}
                value={selectedPlan}
                onChange={value => setSelectedPlan(value)}
              />
            </div>

            <div className="col-md-3 mt-2">
              <label htmlFor="start_date">DATA DE INÍCIO</label>
              <input
                type="date"
                name="start_date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>

            <div className="col-md-3 mt-2">
              <label htmlFor="end_date">DATA DE TERMINO</label>
              <input
                type="text"
                disabled
                name="end_date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>

            <div className="col-md-3 mt-2">
              <label htmlFor="total_price">VALOR_FINAL</label>
              <input
                type="text"
                disabled
                name="total_price"
                value={totalPrice}
              />
            </div>
          </ContentForm>
        )}
      </WhiteBlock>
    </form>
  );
}
