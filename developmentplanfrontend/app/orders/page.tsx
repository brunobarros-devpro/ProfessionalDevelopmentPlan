"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { OrderService } from "@/src/services/orderService";
import OrderForm from "@/src/components/OrderForm";


export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const list = await OrderService.listOrders();
            setOrders(list);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleDelete = async (id: string) => {
        await OrderService.deleteOrder(id);
        await loadOrders();
    };

    if (loading) return <div className="p-4">Loading orders...</div>;

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Orders</h1>
            <OrderForm
                onSubmit={() => loadOrders()}
            />

            {orders.map((order) => {
                const id = order.orderId
                return (
                  <div key={id} className="border p-3 rounded space-y-1">
                      <div><b>ID:</b> {id}</div>
                      <div><b>Restaurant:</b> {order.restaurantId}</div>
                      <div><b>Status:</b> {order.status}</div>
                      <div><b>Total:</b> R$ {order.total}</div>

                      <div className="flex gap-2">
                          <Link
                              href={`/orders/${id}/edit`}
                              className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                          >
                              Edit
                          </Link>

                          <button
                              onClick={() => handleDelete(id)}
                              className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                          >
                              Delete
                          </button>
                      </div>
                  </div>
                );
            })}
        </div>
    );
}
