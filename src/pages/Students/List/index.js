import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { differenceInYears } from 'date-fns';

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

export default function List() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  async function loadStudents() {
    setLoading(true);

    const response = await api.get('/students', {
      params: {
        name: search,
      },
    });

    setStudents(
      response.data.map(student => ({
        ...student,
        age: differenceInYears(new Date(), new Date(student.birth)),
      }))
    );
    setLoading(false);
  }

  useEffect(() => {
    loadStudents();
  }, []); // eslint-disable-line

  function handleSearch(event) {
    if (event.key === 'Enter') {
      loadStudents();
    }
  }

  return (
    <>
      <ContentHeader>
        <h1>Gerenciando alunos</h1>

        <Button link to="/students/new">
          <FaPlus size={14} /> CADASTRAR
        </Button>

        <SearchInput
          type="text"
          placeholder="Buscar aluno"
          value={search}
          onChange={event => setSearch(event.target.value)}
          onKeyDown={handleSearch}
        />
      </ContentHeader>

      <WhiteBlock>
        {loading ? (
          <LoadingBlock size={30} height="40vh" />
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>NOME</Th>
                <Th>E-MAIL</Th>
                <Th align="center">IDADE</Th>
                <Th />
                <Th />
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <Td>{student.name}</Td>
                  <Td>{student.email}</Td>
                  <Td align="center">{student.age}</Td>
                  <Td align="right">
                    <SimpleLink
                      to={`/students/${student.id}/edit`}
                      color={colors.textInfo}
                    >
                      editar
                    </SimpleLink>
                  </Td>
                  <Td align="left">
                    <SimpleButton type="button" color={colors.textDanger}>
                      apagar
                    </SimpleButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </WhiteBlock>
    </>
  );
}
