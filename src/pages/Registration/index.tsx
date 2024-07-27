import React, { useCallback, useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation, useQuery, useQueryClient  } from "react-query";

import {
  ContainerButton,
  ContainerRegistration,
  ContainerTable,
  IconButton,
} from "./registration";
import TableComponent from "../../components/Table";
import ModalComponent from "../../components/ModalComponent";
import { FormComponent } from "../../components/FormComponent";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { getAllClients } from "../../services/getAllClients";
import { deleteClient } from "../../services/deleteClient";
import dayjs from "dayjs";

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
          <IconButton onClick={() => openConfirmDeleteModal(params.row.id)}>
            <DeleteIcon titleAccess="Excluir" />
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
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<FormData | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: rows = [], isLoading: loading } = useQuery('clients', async () => {
    const data = await getAllClients();
    return data.map(client => ({
      ...client,
      birthDate: dayjs(client.birthDate).format("DD/MM/YYYY"),
    }));
  });

  const deleteMutation = useMutation(deleteClient, {
    onSuccess: () => {
      queryClient.invalidateQueries('clients');
      closeConfirmDeleteModal();
    },
  });

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
    setSelectedClient(null);
    setIsEdit(false);
  }, []);

  const handleEdit = useCallback((client: FormData) => {
    setSelectedClient(client);
    setIsEdit(true);
    setOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    if (clientToDelete !== null) {
      deleteMutation.mutate(clientToDelete);
    }
  }, [clientToDelete, deleteMutation]);

  const openConfirmDeleteModal = (id: number) => {
    setClientToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setConfirmDeleteOpen(false);
    setClientToDelete(null);
  };
  return (
    <ContainerRegistration>
      <ContainerTable>
        <TableComponent
          columns={columns}
          rows={rows}
          openModal={handleOpenModal}
          loading={loading}
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
          getAllClients={() => queryClient.invalidateQueries('clients')}
        />
      </ModalComponent>
      <ConfirmDeleteModal
        open={confirmDeleteOpen}
        onClose={closeConfirmDeleteModal}
        onConfirm={handleDelete}
        message="Deseja realmente excluir o cliente?"
      />
    </ContainerRegistration>
  );
};

export default RegistrationPage;
