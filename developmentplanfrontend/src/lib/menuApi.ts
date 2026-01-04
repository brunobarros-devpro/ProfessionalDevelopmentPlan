import axios from "axios";

const BASE = (
  process.env.NEXT_PUBLIC_ORDERS_API_BASE ?? process.env.NEXT_PUBLIC_API_URL ?? "https://localhost:7166"
).replace(/\/$/, "");

export const menuApi = axios.create({
  baseURL: `${BASE}/api`,
  headers: { "Content-Type": "application/json" },
});

export const MenuApi = {
  listByRestaurant: async (restaurantId: string) => (await menuApi.get(`/menuItems?restaurantId=${restaurantId}`)).data,
};
