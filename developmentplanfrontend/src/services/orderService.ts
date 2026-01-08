import { OrdersApi } from "../lib/ordersApi";
import type { Order } from "../Types/Order";

export const OrderService = {
  listOrders: (): Promise<Order[]> => OrdersApi.list(),
  getOrder: (id: string): Promise<Order> => OrdersApi.find(id),
  createOrder: (order: Order): Promise<Order> => OrdersApi.create(order),
  updateOrder: (id: string, order: Order): Promise<Order> =>
    OrdersApi.update(id, order),
  deleteOrder: (id: string): Promise<void> => OrdersApi.remove(id),
};
