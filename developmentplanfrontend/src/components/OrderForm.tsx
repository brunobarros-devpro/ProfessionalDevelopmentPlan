"use client";
import { useEffect, useState } from "react";
import { OrderService } from "../services/orderService";
import { MenuService } from "../services/menuService";
import { Order, OrderItem } from "../Types/Order";
import type { MenuItem } from "../lib/menuApi";

const RESTAURANT_ID = "CA777F9E-AD06-412F-B2C2-84D1E9CC8307";
const COSTUMER_ID = "B21DFB63-E78A-469E-B335-E44F288627E8";

export default function OrderForm({
  initialOrder,
  onSubmit,
}: {
  initialOrder?: Order;
  onSubmit?: (order: Order) => void;
}) {
  const [items, setItems] = useState<OrderItem[]>([
    { menuItemId: "", quantity: 1, unitPrice: 0, name: "" },
  ]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  const isEdit = !!initialOrder;

  useEffect(() => {
    MenuService.listMenuItems(RESTAURANT_ID).then(setMenuItems);
  }, []);

  useEffect(() => {
    if (initialOrder?.items?.length) {
      setItems(initialOrder.items);
    }
  }, [initialOrder]);

  const updateItem = (index: number, changes: Partial<OrderItem>) => {
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, ...changes } : it))
    );
  };

  const validItems = items.filter((i) => i.menuItemId);

  const submit = async () => {
    if (!validItems.length) return;

    setLoading(true);

    const payload: Order = {
      restaurantId: RESTAURANT_ID,
      items: validItems,
      orderId: initialOrder?.orderId || "",
      total: validItems.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      ),
      status: initialOrder?.status || "Pending",
      customerId: COSTUMER_ID,
    };

    try {
      const updateId = initialOrder?.orderId ?? initialOrder?.orderId;
      const result =
        isEdit && updateId
          ? await OrderService.updateOrder(updateId, payload)
          : await OrderService.createOrder(payload);

      onSubmit?.(result);

      if (!isEdit) {
        setItems([{ menuItemId: "", quantity: 1, unitPrice: 0, name: "" }]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-3 items-center"
        >
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Item
            </label>
            <select
              value={item.menuItemId}
              onChange={(e) => {
                const found = menuItems.find((m) => m.id === e.target.value);
                updateItem(i, {
                  menuItemId: e.target.value,
                  unitPrice: found?.price ?? 0,
                  name: found?.name ?? "",
                });
              }}
              className="w-full rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500/70"
            >
              <option value="">Select an item</option>
              {menuItems.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) =>
                updateItem(i, { quantity: Number(e.target.value) })
              }
              className="w-full rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500/70"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Unit price
            </label>
            <input
              type="number"
              value={item.unitPrice}
              disabled
              className="w-full rounded-md border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-400"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              setItems(items.filter((_, idx) => idx !== i))
            }
            className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-md border border-red-900/60 bg-red-900/40 text-sm text-red-100 hover:bg-red-800/70 transition-colors"
          >
            ✕
          </button>
        </div>
      ))}

      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
        <button
          type="button"
          onClick={() =>
            setItems([
              ...items,
              { menuItemId: "", quantity: 1, unitPrice: 0, name: "" },
            ])
          }
          className="text-xs font-medium text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
        >
          <span className="text-base leading-none">+</span>
          Add item
        </button>

        <button
          type="button"
          onClick={submit}
          disabled={loading || !validItems.length}
          className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-emerald-900/40 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Saving..." : isEdit ? "Save changes" : "Create order"}
        </button>
      </div>
    </div>
  );
}
