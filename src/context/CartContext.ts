import { createContext } from "react";
import type { CartItem } from "../types";

export interface CartContextType {
  cartItems: CartItem[];
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);