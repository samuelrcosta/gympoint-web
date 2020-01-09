import styled from 'styled-components';

import colors from '../../styles/colors';

export const Button = styled.button`
  border: 0;
  background: 0;
  padding: 0;
  margin: 0;
  font-size: ${props => (props.fontSize ? props.fontSize : '15px')};
  color: ${props => (props.color ? props.color : colors.textDark)};
`;
