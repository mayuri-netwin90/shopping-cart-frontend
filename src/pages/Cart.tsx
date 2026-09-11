import { useCart } from "../context/useCart";
import { Link } from 'react-router-dom';

export function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center gap-4 border-b pb-4"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded-md"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-gray-500 text-sm">
                ${item.product.price.toFixed(2)} each
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="w-7 h-7 border rounded-md hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="w-7 h-7 border rounded-md hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <div className="w-20 text-right font-semibold">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>

            <button
              onClick={() => removeFromCart(item.product.id)}
              className="text-red-500 text-sm hover:underline ml-2"
            >
              Remove
            </button>
          </div>
        ))}
        <Link
          to="/checkout"
          className="block text-center bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 mt-4"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}