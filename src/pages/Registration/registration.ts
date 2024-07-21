import styled from "styled-components";

export const ContainerRegistration = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const ContainerTable = styled.div`
  width: 100%;
  height: calc(100vh - 6rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 999;

`;

export const IconButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  z-index: 999;

  &:hover {
    background-color: var(--color-gray-1);
  }

  svg {
    color: var(--color-gray-5);
    font-size: 1rem;
  }
`;
