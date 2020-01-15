import React from 'react';

import {
  Background,
  Container,
  ButtonsContainer,
  CancelButton,
  ConfirmButton,
} from './styles';

export default function DeleteModal({ message, data, onConfirm, onCancel }) {
  return (
    <>
      <Background>
        <Container>
          <p dangerouslySetInnerHTML={{ __html: message }} />
          <ButtonsContainer>
            <CancelButton type="button" onClick={onCancel}>
              Cancelar
            </CancelButton>
            <ConfirmButton type="button" onClick={() => onConfirm(data)}>
              Sim
            </ConfirmButton>
          </ButtonsContainer>
        </Container>
      </Background>
    </>
  );
}
