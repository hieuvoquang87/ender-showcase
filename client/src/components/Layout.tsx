import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  height: 100vh;
  margin: auto;
  padding: 24px 0;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
`;
