import { FormData } from "../components/FormComponent";
import { getApi } from "../utils/api";

const api = getApi();

export const updateClient = async (id: number, client: FormData): Promise<void> => {
  try {
    await api.put(`/api/clients/${id}`, client);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    throw error;
  }
};
