import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function SimpleButton({ children, ...rest }) {
  return <Button {...rest}>{children}</Button>;
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
