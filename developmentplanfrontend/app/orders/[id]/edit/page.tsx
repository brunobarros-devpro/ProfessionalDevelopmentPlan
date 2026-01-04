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

  if (loading) return <div className="p-4">Loading order...</div>;
  if (!order) return <div className="p-4">Order not found</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Edit Order</h1>

      <OrderForm
        initialOrder={order}
        onSubmit={(updated) => {
          setOrder(updated);
          router.push("/orders");
        }}
      />
    </div>
  );
}
