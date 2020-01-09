import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

import colors from '../../styles/colors';

export const Container = styled.button`
  margin: 5px 0 0;
  height: 44px;
  background: ${colors.primary};
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.03, colors.primary)};
  }
`;

export const LinkContainer = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  height: 38px;
  background: ${colors.primary};
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.03, colors.primary)};
  }

  svg {
    margin-right: 10px;
    margin-left: 5px;
  }
`;
