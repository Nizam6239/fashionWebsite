"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CardContext";
import { useSession } from "next-auth/react";

const Cart = () => {
  const { data: session } = useSession();
  const { cart, updateQuantity, removeFromCart, setUser } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const username = session?.user?.username || null;
    if (username) {
      setUser(username);
    }
  }, [session?.user?.username, setUser]);

  const handleQuantityChange = async (id: number, action: "increase" | "decrease") => {
    const item = cart.find((cartItem) => cartItem.id === id);
    if (!item || !session?.user?.username) return;

    if (action === "decrease" && item.quantity === 1) return;

    const newQuantity = action === "increase" ? item.quantity + 1 : item.quantity - 1;

    try {
      setLoading(true);
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.username,
          productId: item.id,
          quantity: newQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      updateQuantity(id, newQuantity);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (id: number) => {
    if (!session?.user?.username) return;
    try {
      setLoading(true);
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id.toString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      removeFromCart(id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>
      {error && <p className="text-center text-red-600">{error}</p>}
      {cart.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-4 border border-gray-300 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.img?.src || "/placeholder.png"}
                    alt={`Image ${item.id}`}
                    className="w-24 h-24 rounded object-fill"
                  />
                  <div>
                    <span className="block mt-2">Quantity: {item.quantity}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, "increase")}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    disabled={loading}
                  >
                    Increase
                  </button>
                  <button
                    onClick={() => handleQuantityChange(item.id, "decrease")}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    disabled={loading}
                  >
                    Decrease
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
              Total Quantity: {totalQuantity}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
