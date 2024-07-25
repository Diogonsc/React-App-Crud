import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FormComponent } from ".";
import { BrowserRouter as Router } from "react-router-dom";
import { createClient } from "../../services/createClient";
import { updateClient } from "../../services/updateClient";
import dayjs from "dayjs";

const mockGetAllClients = jest.fn();
const mockCloseModal = jest.fn();

jest.mock("../../services/createClient", () => ({
  createClient: jest.fn(),
}));

jest.mock("../../services/updateClient", () => ({
  updateClient: jest.fn(),
}));

describe("FormComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza o formulário com valores padrão para edição", () => {
    render(
      <Router>
        <FormComponent
          client={{
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "(11) 99999-9999",
            street: "Main St",
            number: "123",
            complement: "Apt 4B",
            neighborhood: "Downtown",
            city: "Metropolis",
            state: "SP",
            zip: "12345-678",
            birthDate: "1987-11-25T02:00:00.000Z",
            gender: "Masculino",
            notes: "Some notes",
          }}
          isEdit={true}
          closeModal={mockCloseModal}
          getAllClients={mockGetAllClients}
        />
      </Router>
    );

    expect(screen.getByLabelText(/Nome Completo/i)).toHaveValue("John Doe");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("john.doe@example.com");
    expect(screen.getByLabelText(/Telefone/i)).toHaveValue("(11) 99999-9999");
    expect(screen.getByLabelText(/Rua/i)).toHaveValue("Main St");
    expect(screen.getByLabelText(/Número/i)).toHaveValue("123");
    expect(screen.getByLabelText(/Complemento/i)).toHaveValue("Apt 4B");
    expect(screen.getByLabelText(/Bairro/i)).toHaveValue("Downtown");
    expect(screen.getByLabelText(/Cidade/i)).toHaveValue("Metropolis");
    expect(screen.getByLabelText(/Estado/i)).toHaveValue("SP");
    expect(screen.getByLabelText(/CEP/i)).toHaveValue("12345-678");
    expect(screen.getByLabelText(/Data de Nascimento/i)).toHaveValue(
      "25/11/1987"
    );
    expect(screen.getByLabelText(/Observações/i)).toHaveValue("Some notes");
    expect(screen.getByDisplayValue("Masculino")).toBeInTheDocument();
  });

  it("atualiza os campos do formulário corretamente", () => {
    render(
      <Router>
        <FormComponent
          client={{
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "(11) 99999-9999",
            street: "Main St",
            number: "123",
            complement: "Apt 4B",
            neighborhood: "Downtown",
            city: "Metropolis",
            state: "SP",
            zip: "12345-678",
            birthDate: "1987-11-25T02:00:00.000Z",
            gender: "Masculino",
            notes: "Some notes",
          }}
          isEdit={true}
          closeModal={mockCloseModal}
          getAllClients={mockGetAllClients}
        />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Nome Completo/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "jane.doe@example.com" },
    });

    expect(screen.getByLabelText(/Nome Completo/i)).toHaveValue("Jane Doe");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("jane.doe@example.com");
  });

  it("simula o envio do formulário e chama as funções corretamente", async () => {
    render(
      <Router>
        <FormComponent
          client={{
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "(11) 99999-9999",
            street: "Main St",
            number: "123",
            complement: "Apt 4B",
            neighborhood: "Downtown",
            city: "Metropolis",
            state: "SP",
            zip: "12345-678",
            birthDate: "1987-11-25T02:00:00.000Z",
            gender: "Masculino",
            notes: "Some notes",
          }}
          isEdit={true}
          closeModal={mockCloseModal}
          getAllClients={mockGetAllClients}
        />
      </Router>
    );

    (updateClient as jest.Mock).mockResolvedValue({ data: {} });
    (createClient as jest.Mock).mockResolvedValue({ data: {} });

    fireEvent.click(screen.getByRole("button", { name: /Salvar/i }));

    await waitFor(() => {
      expect(updateClient).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "(11) 99999-9999",
          street: "Main St",
          number: "123",
          complement: "Apt 4B",
          neighborhood: "Downtown",
          city: "Metropolis",
          state: "SP",
          zip: "12345-678",
          birthDate: dayjs("1987-11-25T02:00:00.000Z").toDate(),
          gender: "Masculino",
          notes: "Some notes",
        })
      );
    });

    await waitFor(() => expect(mockCloseModal).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockGetAllClients).toHaveBeenCalledTimes(1));
  });
});
