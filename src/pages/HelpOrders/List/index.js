import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import colors from '../../../styles/colors';
import ContentHeader from '../../../components/ContentHeader';
import WhiteBlock from '../../../components/WhiteBlock';
import { Table, Th, Td } from '../../../components/Table';
import SimpleButton from '../../../components/SimpleButton';
import LoadingBlock from '../../../components/LoadingBlock';
import ContentForm from '../../../components/ContentForm';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';

export default function List() {
  const [asks, setAsks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [askOnAnswering, setAskOnAnswering] = useState(null);
  const [answer, setAnswer] = useState('');
  const [formSending, setFormSending] = useState(false);

  async function loadAsks() {
    setLoading(true);

    const response = await api.get('/help-orders');

    setAsks(response.data);
    setLoading(false);
  }

  useEffect(() => {
    loadAsks();
  }, []); // eslint-disable-line

  function handleAnswerModal(ask) {
    setAskOnAnswering(ask);
  }

  function handleCloseModal() {
    setAskOnAnswering(null);
  }

  async function submitAnswer(e) {
    e.preventDefault();

    if (answer === '') {
      toast.error('Preencha uma resposta');
      return;
    }

    const data = {
      answer,
    };

    try {
      setFormSending(true);

      await api.post(`/help-orders/${askOnAnswering.id}/answer`, data);
      toast.success('Resposta enviada com sucesso!');

      setAnswer('');
      setAskOnAnswering(null);
      setFormSending(false);
      loadAsks();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Ocorreu um erro ao enviar a resposta, tente novamente.');
      }
      setFormSending(false);
    }
  }

  return (
    <>
      <div className="row justify-content-center">
        <ContentHeader className="col-md-6">
          <h1>Pedidos de Auxílio</h1>
        </ContentHeader>
      </div>
      <div className="row justify-content-center">
        <WhiteBlock className="col-md-6">
          {loading ? (
            <LoadingBlock size={30} height="40vh" />
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>ALUNO</Th>
                  <Th />
                </tr>
              </thead>
              <tbody>
                {asks.length === 0 && (
                  <tr>
                    <Td cols="2">Nenhum pedido a ser respondido</Td>
                  </tr>
                )}
                {asks.map(ask => (
                  <tr key={ask.id}>
                    <Td>{ask.student.name}</Td>
                    <Td align="right">
                      <SimpleButton
                        type="button"
                        color={colors.textInfo}
                        onClick={() => handleAnswerModal(ask)}
                      >
                        responder
                      </SimpleButton>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </WhiteBlock>
      </div>
      {askOnAnswering && (
        <Modal className="col-md-5" onClose={handleCloseModal}>
          <ContentForm>
            <form onSubmit={submitAnswer}>
              <div>
                <label>PERGUNTA DO ALUNO</label>
                <p>{askOnAnswering.question}</p>
              </div>

              <div className="mt-3">
                <label htmlFor="answer">SUA RESPOSTA</label>
                <textarea
                  name="answer"
                  rows="6"
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                />
              </div>

              <div>
                <Button type="submit" full disabled={formSending}>
                  Responder Aluno
                </Button>
              </div>
            </form>
          </ContentForm>
        </Modal>
      )}
    </>
  );
}
