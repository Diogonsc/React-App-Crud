import styled from "styled-components";

export const BtnIconAdd = styled.div`
   width: 10rem;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  padding: 0.5rem 1rem;
  border-radius: 0.5rem;

  background-color: #1976D2;
  color: #FFF;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 0.5rem;

 &:hover {
    background-color: var(--primary);
 }

`;

export const BoxContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 1rem;
`;