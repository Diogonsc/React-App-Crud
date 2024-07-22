import { getApi } from "../utils/api";

const api = getApi();

export const deleteClient = async (id: number): Promise<void> => {
  try {
    await api.delete(`/api/clients/${id}`);
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    throw error;
  }
};
