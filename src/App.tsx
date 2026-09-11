import { Routes, Route } from 'react-router-dom';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { Header } from './components/Header';
import { Checkout } from './pages/Checkout';
import { CartDrawer } from './components/CartDrawer';

import './App.css';

function App() {
  return (
    <>
      <Header />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;