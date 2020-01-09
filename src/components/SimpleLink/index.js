import React from 'react';
import PropTypes from 'prop-types';

import { TextLink } from './styles';

export default function SimpleLink({ children, ...rest }) {
  return <TextLink {...rest}>{children}</TextLink>;
}

SimpleLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
