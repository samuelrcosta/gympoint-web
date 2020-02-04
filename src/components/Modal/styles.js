import styled from 'styled-components';

export const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const Container = styled.div`
  width: 100%;
  position: absolute;
  top: 40px;
  margin-bottom: 40px;
  left: 0;
`;

export const Body = styled.div`
  width: 100%;
  background: #fff;
  padding: 25px;
  border-radius: 4px;
  z-index: 4;

  p {
    font-size: 16px;
    color: #666666;
    line-height: 26px;
    text-align: left;
  }
`;
