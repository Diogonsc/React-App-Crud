import { render, screen, fireEvent } from "@testing-library/react";
import ModalComponent from ".";

describe("ModalComponent", () => {
  it("renderiza o modal com o título e conteúdo corretos", () => {
    const closeModal = jest.fn();

    render(
      <ModalComponent
        openModal={true}
        closeModal={closeModal}
        title="Test Modal"
      >
        <p>Modal Content</p>
      </ModalComponent>
    );

    // Verifica se o modal está aberto
    expect(screen.getByText(/Test Modal/i)).toBeInTheDocument();
    expect(screen.getByText(/Modal Content/i)).toBeInTheDocument();
  });

  it("chama closeModal quando o botão Fechar é clicado", () => {
    const closeModal = jest.fn();

    render(
      <ModalComponent
        openModal={true}
        closeModal={closeModal}
        title="Test Modal"
      >
        <p>Modal Content</p>
      </ModalComponent>
    );

    // Clica no botão de fechar
    fireEvent.click(screen.getByText(/×/i));

    // Verifica se a função closeModal foi chamada
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it("não renderiza o modal quando openModal é falso", () => {
    const closeModal = jest.fn();

    render(
      <ModalComponent
        openModal={false}
        closeModal={closeModal}
        title="Test Modal"
      >
        <p>Modal Content</p>
      </ModalComponent>
    );

    // Verifica se o modal não está presente
    expect(screen.queryByText(/Test Modal/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Modal Content/i)).not.toBeInTheDocument();
  });
});
