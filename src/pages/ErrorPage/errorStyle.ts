import styled from "styled-components";

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  height: 100vh;
  background-color: var(--background);
`;

export const BoxImageNotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 30rem;
  height: auto;

  img {
    width: 100%;
    height: auto;
  }
`;

export const BtnGoBack = styled.button`
  background-color: var(--primary);
  color: var(--color);
  padding: 1rem;
  border: 0;
  border-radius: 0.5rem;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: var(--blue);
  }
`;
