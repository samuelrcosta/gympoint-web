import React from 'react';
import { FaSearch } from 'react-icons/fa';

import { Container } from './styles';

export default function SearchInput({ ...rest }) {
  return (
    <Container>
      <FaSearch size={14} />
      <input {...rest} />
    </Container>
  );
}
