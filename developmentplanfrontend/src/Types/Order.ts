export type OrderItem = {
  menuItemId: string;
  quantity: number;
  unitPrice: number;
  name: string;
};

export type Order = {
  orderId: string;
  restaurantId: string;
  items: OrderItem[];
  total: number;
  status: string;
  customerId: string;
};
