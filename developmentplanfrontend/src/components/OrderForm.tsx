"use client";
import { useEffect, useState } from "react";
import { OrderService } from "../services/orderService";
import { MenuService } from "../services/menuService";
import { Order, OrderItem } from "../Types/Order";

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
  const [menuItems, setMenuItems] = useState<any[]>([]);
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
      total: validItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0),
      status: initialOrder?.status || "Pending",
      customerId: COSTUMER_ID
    };

    try {
      const updateId = initialOrder?.orderId ?? initialOrder?.orderId;
      const result = isEdit && updateId
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
    <div className="border p-4 rounded space-y-3">
      <h2 className="font-semibold text-lg">
        {isEdit ? "Edit Order" : "Create Order"}
      </h2>

      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-4 gap-2">
          <select
            value={item.menuItemId}
            onChange={(e) => {
              const found = menuItems.find(m => m.id === e.target.value);
              updateItem(i, {
                menuItemId: e.target.value,
                unitPrice: found?.price ?? 0,
                name: found?.name ?? "",
              });
            }}
            className="border p-2 rounded"
          >
            <option className="bg-black" value="">-- select item --</option>
            {menuItems.map((m) => (
              <option className="bg-black" key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateItem(i, { quantity: Number(e.target.value) })
            }
            className="border p-2 rounded"
          />

          <input
            type="number"
            value={item.unitPrice}
            disabled
            className="border p-2 rounded"
          />

          <button
            onClick={() =>
              setItems(items.filter((_, idx) => idx !== i))
            }
            className="bg-red-500 text-white rounded px-2"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={() =>
          setItems([...items, { menuItemId: "", quantity: 1, unitPrice: 0, name: "" }])
        }
        className="text-sm underline"
      >
        + Add item
      </button>

      <button
        onClick={submit}
        disabled={loading || !validItems.length}
        className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : isEdit ? "Save" : "Create"}
      </button>
    </div>
  );
}
