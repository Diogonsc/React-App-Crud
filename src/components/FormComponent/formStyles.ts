import styled from "styled-components";

export const Container = styled.div`
  width: 60rem;
  height: 100%;
  background-color: #ffffff;
`;

export const ContainerForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

export const ButtonComponent = styled.button`
  color: var(--color);
  background-color: var(--primary);
  padding: 0.75rem 2rem;
  font-size: 1.2rem;
  border: 0;
  border-radius: 0.5rem;
  cursor: pointer;

  display: flex;
  align-items: flex-start;

  &:hover {
    background-color: var(--primary-dark);
  }
`;

export const AlertError = styled.p`
 color: var(--danger);
 display: flex;
 justify-content: flex-start;
`;