import { getApi } from '../utils/api';
import { toast } from "react-toastify";

const api = getApi();

export const getAllClients = async (): Promise<FormData> => {
  try {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(1500);

    const response = await api.get("/api/clients");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    toast.error("Erro ao buscar clientes. Por favor, tente novamente.");
    throw error;
  }
};
