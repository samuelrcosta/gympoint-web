import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  table {
    width: 100%;
    border-spacing: 0;

    tbody {
      tr {
        td {
          border-bottom: 1px solid #dee2e6;
        }

        &:last-of-type {
          td {
            border-bottom: 0;
          }
        }
      }
    }
  }
`;
