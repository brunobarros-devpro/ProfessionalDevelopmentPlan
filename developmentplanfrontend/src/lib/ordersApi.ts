import axios from "axios";
import type { Order } from "../Types/Order";

export const ordersApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ORDERS_API_BASE}/api/orders`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const OrdersApi = {
  list: async () => (await ordersApi.get<Order[]>("/")).data,
  find: async (id: string) => (await ordersApi.get<Order>(`/${id}`)).data,
  create: async (order: Order) => (await ordersApi.post<Order>("/", order)).data,
  update: async (id: string, order: Order) =>
    (await ordersApi.put<Order>(`/${id}`, order)).data,
  remove: async (id: string) => {
    await ordersApi.delete(`/${id}`);
  },
};
