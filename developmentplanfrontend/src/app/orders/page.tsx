"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { OrderService } from "../../services/orderService";
import OrderForm from "../../components/OrderForm";
import type { Order } from "../../Types/Order";

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        OrderService.listOrders()
            .then(setOrders)
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: string) => {
        await OrderService.deleteOrder(id);
        setOrders(orders.filter((o) => o.orderId !== id));
    };

    if (loading) return <div className="p-4">Loading orders...</div>;

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Orders</h1>
            <OrderForm
                onSubmit={(order) => setOrders([order, ...orders])}
            />

            {orders.map((order) => (
                <div key={order.orderId} className="border p-3 rounded space-y-1">
                    <div><b>ID:</b> {order.orderId}</div>
                    <div><b>Restaurant:</b> {order.restaurantId}</div>
                    <div><b>Status:</b> {order.status}</div>
                    <div><b>Total:</b> R$ {order.total}</div>

                    <div className="flex gap-2">
                        <Link
                            href={`/orders/${order.orderId}/edit`}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                        >
                            Edit
                        </Link>

                        <button
                            onClick={() => handleDelete(order.orderId)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
