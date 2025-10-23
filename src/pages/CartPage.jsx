import { Link } from "react-router-dom";
import useStore from "../store";
import "./CartPage.css";

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const getTotal = useStore((state) => state.getTotal);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in your cart yet.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-card">
                <img src={item.img} alt={item.name} />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>
                    {item.isGreen
                      ? `${item.quantity} fungu(s) - ${(
                          item.price * item.quantity
                        ).toLocaleString()} TZS`
                      : `${item.quantity} each - ${(
                          item.price * item.quantity
                        ).toLocaleString()} TZS`}
                  </p>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          {/* ✅ Cart Total */}
          <div className="cart-total">
            Total: {getTotal().toLocaleString()} TZS
          </div>

          {/* ✅ Checkout Button */}
          <div className="checkout-section">
            <Link to="/checkout">
              <button className="checkout-btn">Go to Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}