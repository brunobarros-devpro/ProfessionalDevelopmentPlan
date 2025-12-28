"use client";
import { useState } from "react";
import { OrderService } from "../services/orderService";

export default function OrderForm({ onCreated }: { onCreated: (o: any) => void }) {
  const [restaurantId, setRestaurantId] = useState("");
  const [items, setItems] = useState([{ menuItemId: "", quantity: 1, unitPrice: 0 }]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const order = { restaurantId, items };
    const created = await OrderService.createOrder(order);
    onCreated(created);
    setRestaurantId("");
    setItems([{ menuItemId: "", quantity: 1, unitPrice: 0 }]);
    setLoading(false);
  };

  return (
    <div className="border p-4 rounded space-y-3">
      <h2 className="font-semibold text-lg">Criar Order</h2>

      <input
        placeholder="Restaurant ID"
        value={restaurantId}
        onChange={(e) => setRestaurantId(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-3 gap-2">
          <input
            placeholder="Menu Item ID"
            value={item.menuItemId}
            onChange={(e) => {
              const copy = [...items];
              copy[i].menuItemId = e.target.value;
              setItems(copy);
            }}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) => {
              const copy = [...items];
              copy[i].quantity = Number(e.target.value);
              setItems(copy);
            }}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={item.unitPrice}
            onChange={(e) => {
              const copy = [...items];
              copy[i].unitPrice = Number(e.target.value);
              setItems(copy);
            }}
            className="border p-2 rounded"
          />
        </div>
      ))}

      <button
        onClick={() => setItems([...items, { menuItemId: "", quantity: 1, unitPrice: 0 }])}
        className="text-sm underline"
      >
        + Add item
      </button>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 bg-black text-white rounded w-full"
      >
        {loading ? "Creating..." : "Create Order"}
      </button>
    </div>
  );
}
