import { Link } from "react-router-dom";
import { FaShoppingCart, FaCreditCard } from "react-icons/fa";
import "./FloatingCart.css";
import useStore from "../store";

export default function FloatingCart() {
  const cart = useStore((state) => state.cart);

  return (
    <div className="floating-cart">
      <Link to="/cart" className="floating-btn cart-btn">
        <FaShoppingCart size={28} />
        {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
      </Link>
      <Link to="/checkout" className="floating-btn checkout-btn">
        <FaCreditCard size={28} />
      </Link>
    </div>
  );
}