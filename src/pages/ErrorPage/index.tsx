import React from "react";
import { NavLink } from "react-router-dom";
import { BoxImageNotFound, BtnGoBack, ErrorContainer } from "./errorStyle";
import Image404 from "../../assets/404.png";

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <BoxImageNotFound>
        <img src={Image404} alt="Imagem de erro 404" />
      </BoxImageNotFound>
      <NavLink to="/">
        <BtnGoBack>Voltar para a página inicial</BtnGoBack>
      </NavLink>
    </ErrorContainer>
  );
};

export default ErrorPage;
