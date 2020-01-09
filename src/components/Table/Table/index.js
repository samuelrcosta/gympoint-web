import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Table({ children, ...rest }) {
  return (
    <Container>
      <table {...rest}>{children}</table>
    </Container>
  );
}

Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
