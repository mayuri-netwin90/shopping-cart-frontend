import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import type { Product } from "../types";
import { useCart } from "../context/useCart";
import { sessionId } from "../context/cartSession";

const ADD_TO_CART = gql`
  mutation AddToCart($sessionId: String!, $productId: ID!) {
    addToCart(sessionId: $sessionId, productId: $productId) {
      id
      quantity
      product {
        id
        name
        price
      }
    }
  }
`;

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { refreshCart } = useCart();

  const [addToCartMutation, { loading, error }] =
    useMutation(ADD_TO_CART);

  async function handleAddToCart() {
    try {
      console.log("Adding to cart:", {
        sessionId,
        productId: product.id,
      });

      await addToCartMutation({
        variables: {
          sessionId,
          productId: product.id,
        },
      });

      // Refresh cart from the database
      await refreshCart();

      console.log("Cart refreshed successfully");
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>

        <p className="text-gray-500 text-sm mt-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-lg">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}