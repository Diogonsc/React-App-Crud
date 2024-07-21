import React, { useCallback, useEffect, useState } from 'react'
import axios from "axios";
import { GridColDef } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {
  ContainerButton,
  ContainerRegistration,
  ContainerTable,
  IconButton,
} from "./registration";
import TableComponent from '../../components/Table';
import ModalComponent from '../../components/ModalComponent';
import { FormComponent } from '../../components/FormComponent';

export interface IClient {
  id: number;
  name: string | null;
  birthDate: string | null;
  gender: string;
  email: string;
  phone: string;
  zip: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  notes: string;
}

const RegistrationPage: React.FC = () => {
  const [columns] = useState<GridColDef[]>([
    {
      field: "action",
      headerName: "Ações",
      width: 150,
      renderCell: (params) => (
        <ContainerButton>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon titleAccess="Editar" />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon titleAccess='Excluir' />
          </IconButton>
        </ContainerButton>
      ),
    },
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Nome", width: 350 },
    { field: "birthDate", headerName: "Data de Nascimento", width: 250 },
    { field: "gender", headerName: "Sexo", width: 150 },
    { field: "email", headerName: "Email", width: 350 },
    { field: "phone", headerName: "Telefone", width: 200 },
    { field: "zip", headerName: "CEP", width: 150 },
    { field: "street", headerName: "Rua", width: 200 },
    { field: "number", headerName: "Número", width: 150 },
    { field: "neighborhood", headerName: "Bairro", width: 200 },
    { field: "city", headerName: "Cidade", width: 200 },
    { field: "state", headerName: "Estado", width: 200 },
  ]);
  const [rows, setRows] = useState<IClient[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
    setSelectedClient(null);
    setIsEdit(false);
  }, []);

  const handleEdit = useCallback((client: IClient) => {
    setSelectedClient(client);
    setIsEdit(true);
    setOpen(true);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    try {
        await axios.delete(`/api/clients/${id}`);
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  }, []);

  const getAllClients = useCallback(async () => {
    try {
      const response = await axios.get("/api/clients");
      setRows(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  }, []);

  useEffect(() => {
    getAllClients();
  }, [getAllClients]);

  return (
    <ContainerRegistration>
      <ContainerTable>
        <TableComponent
          columns={columns}
          rows={rows}
          openModal={handleOpenModal}
        />
      </ContainerTable>
      <ModalComponent
        openModal={open}
        closeModal={handleCloseModal}
        title={isEdit ? "Editar Cliente" : "Novo Cliente"}
      >
        <FormComponent
          client={selectedClient}
          isEdit={isEdit}
          closeModal={handleCloseModal}
          getAllClients={getAllClients}
        />
      </ModalComponent>
    </ContainerRegistration>
  );
}

export default RegistrationPage