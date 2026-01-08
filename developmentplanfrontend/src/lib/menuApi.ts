import axios from "axios";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
};

const BASE = (
  process.env.NEXT_PUBLIC_ORDERS_API_BASE ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://localhost:7166"
).replace(/\/$/, "");

export const menuApi = axios.create({
  baseURL: `${BASE}/api`,
  headers: { "Content-Type": "application/json" },
});

export const MenuApi = {
  listByRestaurant: async (restaurantId: string): Promise<MenuItem[]> =>
    (await menuApi.get<MenuItem[]>(`/menuItems?restaurantId=${restaurantId}`))
      .data,
};
