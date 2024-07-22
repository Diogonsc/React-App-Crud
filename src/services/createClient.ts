import { FormData } from "../components/FormComponent";
import { getApi } from "../utils/api";

const api = getApi();

export const createClient = async (data: FormData): Promise<void> => {
  try {
    await api.post("/api/clients", data);
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
};
