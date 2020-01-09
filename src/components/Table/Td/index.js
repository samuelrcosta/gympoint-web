import React from 'react';
import PropTypes from 'prop-types';

import { Element } from './styles';

export default function Td({ children, ...rest }) {
  return <Element {...rest}>{children}</Element>;
}

Td.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Td.defaultProps = {
  children: '',
};
