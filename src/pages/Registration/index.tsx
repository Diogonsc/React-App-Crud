import React, { useState } from 'react'

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
          <IconButton onClick={() => console.log('Editando', params.row)}>
            <DeleteIcon titleAccess='Editar' />
          </IconButton>
          <IconButton onClick={() => console.log('Excluindo', params.row.id)}>
            <EditIcon titleAccess="Excluir" />
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

  return (
    <ContainerRegistration>
      <ContainerTable>
        <TableComponent
          columns={columns}
          rows={rows}
        />
      </ContainerTable>
    </ContainerRegistration>
  );
}

export default RegistrationPage