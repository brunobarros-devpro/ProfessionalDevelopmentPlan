import axios from "axios";

export const ordersApi = axios.create({
  baseURL: "https://localhost:7166/api/orders",
  headers: {
    "Content-Type": "application/json",
  },
});

export const OrdersApi = {
  list: async () => (await ordersApi.get("/")).data,
  find: async (id: string) => (await ordersApi.get(`/${id}`)).data,
  create: async (order: any) => (await ordersApi.post("/", order)).data,
  update: async (id: string, order: any) => (await ordersApi.put(`/${id}`, order)).data,
  remove: async (id: string) => await ordersApi.delete(`/${id}`),
};
