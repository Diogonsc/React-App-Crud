import { FormData } from "../components/FormComponent";
import { getApi } from "../utils/api";
import { toast } from "react-toastify";

const api = getApi();

export const createClient = async (data: FormData): Promise<void> => {
  try {
    await api.post("/api/clients", data);
    toast.success("Cliente criado com sucesso!");
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    toast.error("Erro ao criar cliente. Por favor, tente novamente.");
    throw error;
  }
};


