import styled from 'styled-components';
import { Link } from 'react-router-dom';

import colors from '../../styles/colors';

export const TextLink = styled(Link)`
  font-size: ${props => (props.fontSize ? props.fontSize : '15px')};
  color: ${props => (props.color ? props.color : colors.textDark)};
`;
