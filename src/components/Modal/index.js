import React from 'react';
import PropTypes from 'prop-types';

import { Background, Container, Body } from './styles';

export default function Modal({ children, onClose, ...rest }) {
  function handleOusideClick() {
    onClose();
  }

  return (
    <>
      <Background onClick={handleOusideClick} />
      <Container className="row justify-content-center">
        <Body {...rest}>{children}</Body>
      </Container>
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  onClose: () => {},
};
