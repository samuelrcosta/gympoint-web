import styled, { keyframes } from 'styled-components';

import colors from '../../styles/colors';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => (props.height ? props.height : 'auto')};

  svg {
    color: ${props => (props.color ? props.color : colors.primary)};
    animation: ${rotate} 2s linear infinite;
  }
`;
