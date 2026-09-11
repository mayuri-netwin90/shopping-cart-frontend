import type { ReactNode } from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import type { CartItem } from "../types";
import { CartContext } from "./CartContext";
import { sessionId } from "./cartSession";

interface MyCartQuery {
  myCart: CartItem[];
}

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

export function CartProvider({ children }: { children: ReactNode }) {
  const { data, refetch } = useQuery<MyCartQuery>(MY_CART, {
    variables: {
      sessionId,
    },
    fetchPolicy: "network-only",
  });

  const cartItems = data?.myCart ?? [];

  const [removeMutation] = useMutation(REMOVE_FROM_CART);

  const [updateQuantityMutation] = useMutation(UPDATE_CART_QUANTITY);

  const refreshCart = async () => {
    await refetch();
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