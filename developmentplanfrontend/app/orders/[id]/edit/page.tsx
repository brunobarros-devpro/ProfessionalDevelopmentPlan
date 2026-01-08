"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Order } from "@/src/Types/Order";
import OrderForm from "@/src/components/OrderForm";
import { OrderService } from "@/src/services/orderService";

export default function OrderEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    OrderService.getOrder(id)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-slate-200 text-sm px-4 py-2 rounded-full border border-slate-800 bg-slate-900/60">
          Loading order...
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl px-6 py-4 text-center space-y-2">
          <p className="text-sm font-medium text-slate-100">
            Order not found
          </p>
          <p className="text-xs text-slate-400">
            The order you are trying to edit does not exist or was removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <header className="border-b border-slate-800 pb-5 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Edit order
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Update items and details, then save to go back to the list.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/orders")}
            className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-4"
          >
            Back to orders
          </button>
        </header>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl shadow-sm shadow-slate-900/40 p-5">
          <OrderForm
            initialOrder={order}
            onSubmit={(updated) => {
              setOrder(updated);
              router.push("/orders");
            }}
          />
        </div>
      </div>
    </div>
  );
}
