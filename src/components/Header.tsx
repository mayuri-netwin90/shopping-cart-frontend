import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCart } from '../context/CartContext';
import { toggleCartDrawer } from '../store/uiSlice';

export function Header() {
  const { cartItems } = useCart();
  const dispatch = useDispatch();

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-b p-4 flex items-center justify-between max-w-6xl mx-auto">
      <Link to="/" className="text-xl font-bold">
        MyShop
      </Link>

      <button
        type="button"
        onClick={() => dispatch(toggleCartDrawer())}
        className="relative flex items-center gap-1"
      >
        <span>Cart</span>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
    </header>
  );
}