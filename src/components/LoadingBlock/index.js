import React from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

import { Container } from './styles';

export default function LoadingBlock({ size, ...rest }) {
  return (
    <Container {...rest}>
      <FaSpinner size={size} />
    </Container>
  );
}

LoadingBlock.propTypes = {
  size: PropTypes.number,
};

LoadingBlock.defaultProps = {
  size: 14,
};
