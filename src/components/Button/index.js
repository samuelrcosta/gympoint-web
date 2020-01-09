import React from 'react';
import PropTypes from 'prop-types';

import { Container, LinkContainer } from './styles';

export default function Button({ children, link, ...rest }) {
  if (link) {
    return <LinkContainer {...rest}>{children}</LinkContainer>;
  }
  return <Container {...rest}>{children}</Container>;
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  link: PropTypes.bool,
};

Button.defaultProps = {
  link: false,
};
