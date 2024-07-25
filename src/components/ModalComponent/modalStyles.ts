import styled from "styled-components";

export const ContainerModal = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  width: 100%;
`;

export const Modal = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Header = styled.div`
  width: 100%;
  color: var(--text-color);
  font-size: 1.2rem;
`;

export const Content = styled.div`
  padding: 0.5rem;
  overflow: auto;

  span {
    font-size: 1rem;
  }
`;

export const Close = styled.a`
  cursor: pointer;
  font-size: 24px;
  color: var(--title);
`;

export const TitleModal = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`;

export const Title = styled.span`
  color: var(--color-primary-dark);
  font-size: 16px;
  font-weight: 700;
`;

export const Hr = styled.hr`
  width: 100%;
  border: 1px solid var(--background);
`;
