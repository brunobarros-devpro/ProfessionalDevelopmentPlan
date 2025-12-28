import { OrdersApi } from "../lib/ordersApi";

export const OrderService = {
  listOrders: () => OrdersApi.list(),
  getOrder: (id: string) => OrdersApi.find(id),
  createOrder: (order: any) => OrdersApi.create(order),
  updateOrder: (id: string, order: any) => OrdersApi.update(id, order),
  deleteOrder: (id: string) => OrdersApi.remove(id),
};
