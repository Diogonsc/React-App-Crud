import { getApi } from "../utils/api";
import { toast } from "react-toastify";

const api = getApi();

export const deleteClient = async (id: number): Promise<void> => {
  try {
    await api.delete(`/api/clients/${id}`);
    toast.success("Cliente excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    toast.error("Erro ao excluir cliente. Por favor, tente novamente.");
    throw error;
  }
};
