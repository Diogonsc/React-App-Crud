import { FormData } from "../components/FormComponent";
import { getApi } from "../utils/api";
import { toast } from "react-toastify";

const api = getApi();

export const updateClient = async (id: number, client: FormData): Promise<void> => {
  try {
    await api.put(`/api/clients/${id}`, client);
    toast.success("Cliente atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    toast.error("Erro ao atualizar cliente. Por favor, tente novamente.");
    throw error;
  }
};
