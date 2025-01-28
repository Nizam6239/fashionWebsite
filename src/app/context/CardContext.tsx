"use client";
import { StaticImageData } from "next/image";
import React, { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  id: number;
  img: StaticImageData;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  resetCart: () => void;
  setUser: (username: string | null) => void;
  totalQuantity: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Load cart data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []);

  // Save cart data to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart((prev) =>
        prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart((prev) => [...prev, item]);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((cartItem) => cartItem.id !== id));
  };

  const resetCart = () => {
    setCart([]);
  };

  const setUser = (username: string | null) => {
    if (currentUser !== username) {
      setCurrentUser(username);
      resetCart();
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        resetCart,
        setUser,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
