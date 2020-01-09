import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  svg {
    position: absolute;
    color: #ccc;
    margin: 12px 0 0 15px;
  }

  input {
    height: 38px;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 0 15px 0 40px;
    color: #666;

    &::placeholder {
      color: #ccc;
    }
  }
`;
