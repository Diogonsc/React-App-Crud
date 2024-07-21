import { http, HttpResponse } from "msw";

interface IClient {
  id: number;
  name: string;
  birthDate: string;
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

const loadClients = (): IClient[] => {
  const clients = localStorage.getItem("clients");
  return clients ? JSON.parse(clients) : [];
};

const saveClients = (clients: IClient[]) => {
  localStorage.setItem("clients", JSON.stringify(clients));
};

const clients: IClient[] = loadClients();

export const handlers = [
  http.get("/api/clients", (resolver) => {
    return HttpResponse.json(clients);
  }),

  http.post("/api/clients", async ({ request }) => {
    const requestBody = await request.json();
    const newClient: IClient = {
      id: clients.length ? clients[clients.length - 1].id + 1 : 1,
      ...requestBody,
    };
    clients.push(newClient);
    saveClients(clients);
    return HttpResponse.json(newClient);
  }),

  http.put("/api/clients/:id", async ({ request, params }) => {
    const requestBody = await request.json();
    const clientId = parseInt(params.id, 10);
    const clientIndex = clients.findIndex((client) => client.id === clientId);

    if (clientIndex !== -1) {
      clients[clientIndex] = { ...clients[clientIndex], ...requestBody };
      saveClients(clients);
      return HttpResponse.json(clients[clientIndex]);
    } else {
      return HttpResponse.status(404).json({ error: "Client not found" });
    }
  }),

  http.delete("/api/clients/:id", async ({ params }) => {
    const clientId = parseInt(params.id, 10);
    const clientIndex = clients.findIndex((client) => client.id === clientId);

    if (clientIndex !== -1) {
      const deletedClient = clients.splice(clientIndex, 1)[0];
      saveClients(clients);
      return HttpResponse.json(deletedClient);
    } else {
      return HttpResponse.status(404).json({ error: "Client not found" });
    }
  }),
];
