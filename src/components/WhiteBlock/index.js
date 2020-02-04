import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function WhiteBlock({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>;
}

WhiteBlock.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
};
