import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { closeCartDrawer } from '../store/uiSlice';
import type { RootState } from '../store';

export function CartDrawer() {
  const dispatch = useDispatch();
  const cartDrawerOpen = useSelector((state: RootState) => state.ui.cartDrawerOpen);
  const { cartItems, removeFromCart } = useCart();

  if (!cartDrawerOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={() => dispatch(closeCartDrawer())}
      />

      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Your Cart</h2>
          <button
            type="button"
            onClick={() => dispatch(closeCartDrawer())}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-sm">Your cart is empty.</p>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3 border-b pb-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-gray-500">
                    {item.quantity} × ${item.product.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <Link
          to="/cart"
          onClick={() => dispatch(closeCartDrawer())}
          className="block text-center bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 mt-4"
        >
          View Full Cart
        </Link>
      </div>
    </>
  );
}