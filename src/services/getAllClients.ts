import { getApi } from '../utils/api';

const api = getApi();

// Defina o tipo de dado retornado pela API, se possível
interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  birthDate: string;
  gender: string;
  notes?: string;
}

export const getAllClients = async (): Promise<Client[]> => {
  try {
    const response = await api.get("/api/clients");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error; // Re-lança o erro para ser tratado no chamador
  }
};
