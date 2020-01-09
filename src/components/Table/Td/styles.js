import styled from 'styled-components';

import colors from '../../../styles/colors';

export const Element = styled.td`
  font-size: 16px;
  color: ${colors.textLight};
  padding: 12px;
  text-align: ${props => (props.align ? props.align : 'left')};
`;
