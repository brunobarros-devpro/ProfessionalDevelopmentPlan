import { MenuApi, type MenuItem } from "../lib/menuApi";

export const MenuService = {
  listMenuItems: (restaurantId: string): Promise<MenuItem[]> =>
    MenuApi.listByRestaurant(restaurantId),
};
