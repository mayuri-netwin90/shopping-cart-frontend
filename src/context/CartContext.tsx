import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import type { Product, CartItem } from "../types";

const SESSION_ID_KEY = "shop-session-id";

function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }

  return sessionId;
}

export const sessionId = getSessionId();

const MY_CART = gql`
  query MyCart($sessionId: String!) {
    myCart(sessionId: $sessionId) {
      id
      quantity
      product {
        id
        name
        description
        price
        image
        category
        stock
      }
    }
  }
`;

const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($sessionId: String!, $productId: ID!) {
    removeFromCart(sessionId: $sessionId, productId: $productId)
  }
`;

const UPDATE_CART_QUANTITY = gql`
  mutation UpdateCartQuantity(
    $sessionId: String!
    $productId: ID!
    $quantity: Int!
  ) {
    updateCartQuantity(
      sessionId: $sessionId
      productId: $productId
      quantity: $quantity
    ) {
      id
      quantity
      product {
        id
        name
        description
        price
        image
        category
        stock
      }
    }
  }
`;

interface CartContextType {
  cartItems: CartItem[];
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { data, loading, refetch } = useQuery(MY_CART, {
    variables: {
      sessionId,
    },
    fetchPolicy: "network-only",
  });

  const [removeMutation] = useMutation(REMOVE_FROM_CART);

  const [updateQuantityMutation] = useMutation(UPDATE_CART_QUANTITY);

  useEffect(() => {
    if (data?.myCart) {
      setCartItems(data.myCart);
    }
  }, [data]);

  const refreshCart = async () => {
    const result = await refetch();

    if (result.data?.myCart) {
      setCartItems(result.data.myCart);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await removeMutation({
        variables: {
          sessionId,
          productId,
        },
      });

      await refreshCart();
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  };

  const updateQuantity = async (
    productId: string,
    quantity: number
  ) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      await updateQuantityMutation({
        variables: {
          sessionId,
          productId,
          quantity,
        },
      });

      await refreshCart();
    } catch (error) {
      console.error("Failed to update cart quantity:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        removeFromCart,
        updateQuantity,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}