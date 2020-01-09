import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ContentHeader({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>;
}

ContentHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
