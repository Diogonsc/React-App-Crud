import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import DrawerAppBar from ".";

describe("DrawerAppBar", () => {
  it("renderiza a app bar e o drawer", () => {
    render(
      <Router>
        <DrawerAppBar />
      </Router>
    );

    // Verifica se o título está presente
    expect(screen.getByText(/Cadastro de Clientes/i)).toBeInTheDocument();

    // Verifica se o botão de menu está presente
    expect(screen.getByLabelText(/open drawer/i)).toBeInTheDocument();

    // Verifica se o item de menu está presente
    expect(screen.getByText(/Cadastro Clientes/i)).toBeInTheDocument();
  });

  it("abre e fecha o drawer", () => {
    render(
      <Router>
        <DrawerAppBar />
      </Router>
    );

    // Botão de abrir drawer
    const openButton = screen.getByLabelText(/open drawer/i);
    fireEvent.click(openButton);

    // Verifica se o drawer está visível
    expect(screen.getByText(/Cadastro Clientes/i)).toBeVisible();

    // Botão de fechar drawer
    const closeButton = screen.getByTestId("ChevronLeftIcon");
    fireEvent.click(closeButton);

    // Verifica se o drawer está oculto
    expect(screen.queryByText(/Cadastro Clientes/i)).not.toBeVisible();
  });
});
