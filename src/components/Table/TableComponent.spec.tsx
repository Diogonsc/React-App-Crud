import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TableComponent from ".";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
];

const rows = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

const openModal = jest.fn();

describe("TableComponent", () => {
  it("renders table with columns and rows", () => {
    render(
      <TableComponent columns={columns} rows={rows} openModal={openModal} />
    );

    // Verifica se as colunas estão presentes
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();

    // Verifica se as linhas estão presentes
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("calls openModal when 'Novo Cliente' button is clicked", () => {
    render(
      <TableComponent columns={columns} rows={rows} openModal={openModal} />
    );

    // Verifica se o botão "Novo Cliente" está presente
    const addButton = screen.getByTitle("Adicionar novo cliente");
    expect(addButton).toBeInTheDocument();

    // Simula o clique no botão
    fireEvent.click(addButton);

    // Verifica se a função openModal foi chamada
    expect(openModal).toHaveBeenCalledTimes(1);
  });
});
