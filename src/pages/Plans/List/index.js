import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { formatPrice } from '../../../utils/format';

import colors from '../../../styles/colors';
import ContentHeader from '../../../components/ContentHeader';
import Button from '../../../components/Button';
import WhiteBlock from '../../../components/WhiteBlock';
import { Table, Th, Td } from '../../../components/Table';
import SimpleLink from '../../../components/SimpleLink';
import SimpleButton from '../../../components/SimpleButton';
import LoadingBlock from '../../../components/LoadingBlock';
import DeleteModal from '../../../components/DeleteModal';

export default function List() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  async function loadPlans() {
    setLoading(true);

    const response = await api.get('/plans');

    setPlans(
      response.data.map(plan => ({
        ...plan,
        formatedPrice: formatPrice(plan.price),
        durationText: plan.duration > 1 ? 'meses' : 'mês',
      }))
    );
    setLoading(false);
  }

  useEffect(() => {
    loadPlans();
  }, []); // eslint-disable-line

  function handleDeleteModal(plan) {
    const message = `Tem certeza que deseja excluir o plano <strong>${plan.title}</strong>?`;
    setDeleting({ data: plan, message });
  }

  async function handleDelete(plan) {
    setDeleting(null);

    try {
      await api.delete(`/plans/${plan.id}`);

      toast.success('O Plano foi excluído com sucesso!');
    } catch (err) {
      toast.error('Ocorreu um erro ao apagar o plano.');
    }

    loadPlans();
  }

  return (
    <>
      <ContentHeader>
        <h1>Gerenciando planos</h1>

        <Button link to="/plans/new">
          <FaPlus size={14} /> CADASTRAR
        </Button>
      </ContentHeader>

      <WhiteBlock>
        {loading ? (
          <LoadingBlock size={30} height="40vh" />
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>TÍTULO</Th>
                <Th align="center">DURAÇÃO</Th>
                <Th align="center">VALOR p/ MÊS</Th>
                <Th />
                <Th />
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <Td>{plan.title}</Td>
                  <Td align="center">
                    {plan.duration} {plan.durationText}
                  </Td>
                  <Td align="center">{plan.formatedPrice}</Td>
                  <Td align="right">
                    <SimpleLink
                      to={`/plans/${plan.id}/edit`}
                      color={colors.textInfo}
                    >
                      editar
                    </SimpleLink>
                  </Td>
                  <Td align="left">
                    <SimpleButton
                      type="button"
                      color={colors.textDanger}
                      onClick={() => handleDeleteModal(plan)}
                    >
                      apagar
                    </SimpleButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </WhiteBlock>

      {deleting && (
        <DeleteModal
          {...deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  );
}
