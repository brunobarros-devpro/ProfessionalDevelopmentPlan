"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { OrderService } from "@/src/services/orderService";
import OrderForm from "@/src/components/OrderForm";
import type { Order } from "@/src/Types/Order";


export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-slate-200 text-sm px-4 py-2 rounded-full border border-slate-800 bg-slate-900/60">
          Loading orders...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <header className="flex flex-col gap-2 border-b border-slate-800 pb-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Orders
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Create new orders and manage existing ones.
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl shadow-sm shadow-slate-900/40 p-5">
            <h2 className="text-sm font-medium text-slate-300 mb-4">
              New order
            </h2>
            <OrderForm onSubmit={loadOrders} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-slate-300">
                Recent orders
              </h2>
              <span className="text-xs text-slate-500">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/40 px-4 py-6 text-center text-sm text-slate-400">
                No orders yet. Create your first order using the form.
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => {
                  const id = order.orderId;
                  return (
                    <div
                      key={id}
                      className="rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3 flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col gap-1">
                          <div className="text-xs font-mono text-slate-500">
                            ID: <span className="text-slate-300">{id}</span>
                          </div>
                          <div className="text-sm text-slate-300">
                            Restaurant{" "}
                            <span className="font-medium">
                              {order.restaurantId}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="inline-flex items-center rounded-full border border-emerald-600/40 bg-emerald-600/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
                            {order.status}
                          </div>
                          <div className="mt-1 text-sm font-semibold text-slate-100">
                            R$ {order.total.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/orders/${id}/edit`}
                          className="inline-flex items-center justify-center rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700 transition-colors"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(id)}
                          className="inline-flex items-center justify-center rounded-md bg-red-600/90 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-500 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
