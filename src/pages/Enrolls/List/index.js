import React, { useState, useEffect } from 'react';
import { FaPlus, FaCheckCircle } from 'react-icons/fa';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import colors from '../../../styles/colors';
import ContentHeader from '../../../components/ContentHeader';
import Button from '../../../components/Button';
import SearchInput from '../../../components/SearchInput';
import WhiteBlock from '../../../components/WhiteBlock';
import { Table, Th, Td } from '../../../components/Table';
import SimpleLink from '../../../components/SimpleLink';
import SimpleButton from '../../../components/SimpleButton';
import LoadingBlock from '../../../components/LoadingBlock';
import DeleteModal from '../../../components/DeleteModal';

export default function List() {
  const [enrolls, setEnrolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  async function loadEnrolls() {
    setLoading(true);

    const response = await api.get('/enrolls');

    setEnrolls(
      response.data.map(enroll => ({
        ...enroll,
        start_dateFormatted: format(
          parseISO(enroll.start_date),
          "d 'de' MMMM 'de' yyyy",
          { locale: pt }
        ),
        end_dateFormatted: format(
          parseISO(enroll.end_date),
          "d 'de' MMMM 'de' yyyy",
          { locale: pt }
        ),
      }))
    );
    setLoading(false);
  }

  useEffect(() => {
    loadEnrolls();
  }, []); // eslint-disable-line

  function handleDeleteModal(enroll) {
    const message = `Tem certeza que deseja excluir a matrícula do aluno <strong>${enroll.student.name}</strong>?`;
    setDeleting({ data: enroll, message });
  }

  async function handleDelete(enroll) {
    setDeleting(null);

    try {
      await api.delete(`/enrolls/${enroll.id}`);

      toast.success('A matrícula foi excluída com sucesso!');
    } catch (err) {
      toast.error('Ocorreu um erro ao apagar a matrícula.');
    }

    loadEnrolls();
  }

  return (
    <>
      <ContentHeader>
        <h1>Gerenciando matrículas</h1>

        <Button link to="/enrolls/new">
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
                <Th>ALUNO</Th>
                <Th align="center">PLANO</Th>
                <Th align="center">INÍCIO</Th>
                <Th align="center">TÉRMINO</Th>
                <Th align="center">ATIVA</Th>
                <Th />
                <Th />
              </tr>
            </thead>
            <tbody>
              {enrolls.map(enroll => (
                <tr key={enroll.id}>
                  <Td>{enroll.student.name}</Td>
                  <Td align="center">{enroll.plan.title}</Td>
                  <Td align="center">{enroll.start_dateFormatted}</Td>
                  <Td align="center">{enroll.end_dateFormatted}</Td>
                  <Td align="center">
                    <FaCheckCircle
                      size={16}
                      color={enroll.active ? '#42cb59' : '#dddddd'}
                    />
                  </Td>
                  <Td align="right">
                    <SimpleLink
                      to={`/enrolls/${enroll.id}/edit`}
                      color={colors.textInfo}
                    >
                      editar
                    </SimpleLink>
                  </Td>
                  <Td align="left">
                    <SimpleButton
                      type="button"
                      color={colors.textDanger}
                      onClick={() => handleDeleteModal(enroll)}
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
