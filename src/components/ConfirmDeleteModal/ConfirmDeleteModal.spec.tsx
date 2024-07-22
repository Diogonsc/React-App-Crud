
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmDeleteModal from ".";

describe("ConfirmDeleteModal", () => {
  it("renderiza o modal com o título e conteúdo corretos", () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();

    render(
      <ConfirmDeleteModal
        open={true}
        onClose={onClose}
        onConfirm={onConfirm}
        message="Test Modal"
      />
    );

    // Verifica se o modal está aberto
    expect(screen.getByText(/Confirmação de Exclusão/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Modal/i)).toBeInTheDocument();
  });

  it("chama onClose quando o botão Cancelar é clicado", () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();

    render(
      <ConfirmDeleteModal
        open={true}
        onClose={onClose}
        onConfirm={onConfirm}
        message="Test Modal"
      />
    );

    // Clica no botão de fechar
    fireEvent.click(screen.getByText(/Cancelar/i));

    // Verifica se a função onClose foi chamada
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("chama onConfirm quando o botão Confirmar é clicado", () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();

    render(
      <ConfirmDeleteModal
        open={true}
        onClose={onClose}
        onConfirm={onConfirm}
        message="Test Modal"
      />
    );

    // Clica no botão de fechar
    fireEvent.click(screen.getByText(/Confirmar/i));

    // Verifica se a função onConfirm foi chamada
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("não renderiza o modal quando open é falso", () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();

    render(
      <ConfirmDeleteModal
        open={false}
        onClose={onClose}
        onConfirm={onConfirm}
        message="Test Modal"
      />
    );

    // Verifica se o modal não está presente
    expect(screen.queryByText(/Confirmação de Exclusão/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Test Modal/i)).not.toBeInTheDocument();
  });
})