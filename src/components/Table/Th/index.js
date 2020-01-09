import React from 'react';
import PropTypes from 'prop-types';

import { Element } from './styles';

export default function Th({ children, ...rest }) {
  return <Element {...rest}>{children}</Element>;
}

Th.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Th.defaultProps = {
  children: '',
};
