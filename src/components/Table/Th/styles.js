import styled from 'styled-components';

import colors from '../../../styles/colors';

export const Element = styled.th`
  font-size: 16px;
  color: ${colors.textDark};
  font-weight: bold;
  text-align: ${props => (props.align ? props.align : 'left')};
  padding: 12px;
`;
