import { MenuApi } from "../lib/menuApi";

export const MenuService = {
  listMenuItems: (restaurantId: string) => MenuApi.listByRestaurant(restaurantId),
};
