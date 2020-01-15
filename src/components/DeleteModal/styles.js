import styled from 'styled-components';
import { darken } from 'polished';

import colors from '../../styles/colors';

export const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: #fff;
  padding: 45px 30px 25px;
  border-radius: 4px;

  p {
    font-size: 16px;
    color: #666666;
    line-height: 26px;
    text-align: left;
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-self: center;
`;

export const CancelButton = styled.button`
  height: 38px;
  padding: 0 13px;
  background: ${colors.secondary};
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.03, colors.secondary)};
  }
`;

export const ConfirmButton = styled.button`
  margin-left: 8px;
  height: 38px;
  padding: 0 13px;
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
