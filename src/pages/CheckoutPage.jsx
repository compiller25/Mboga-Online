import { useState } from "react";
import useStore from "../store";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const getTotal = useStore((state) => state.getTotal);

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Please fill in all required fields!");
      return;
    }

    setOrderPlaced(true);
    clearCart();

    // Prepare order summary for WhatsApp
    const orderDetails = cart
      .map((item) => {
        const qty = item.quantity || 1;
        const pricePerItem = item.price;
        const total = pricePerItem * qty;
        const label = item.isGreen ? `${qty} fungu` : `${qty} each`;
        return `${item.name} - ${label} - ${total.toLocaleString()} TZS`;
      })
      .join("\n");

    const message = `Hello! I want to place an order:\n${orderDetails}\n\nCustomer Info:\nName: ${customerInfo.name}\nPhone: ${customerInfo.phone}\nAddress: ${customerInfo.address}\nNotes: ${customerInfo.notes || "-"}`;

    const whatsappUrl = `https://wa.me/255757808854?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-container empty">
        <h2>Your cart is empty!</h2>
        <p>Please add some vegetables before proceeding to checkout.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Complete Your Order</h1>

      {orderPlaced && (
        <p className="success-message">
          ✅ Your order has been placed successfully! Redirecting to WhatsApp...
        </p>
      )}

      {/* Order Summary */}
      <div className="checkout-card">
        <h2>Order Summary</h2>
        <ul className="checkout-list">
          {cart.map((item) => (
            <li key={item.id} className="checkout-item">
              <span className="item-name">{item.name}</span>
              <span className="item-qty">
                {item.isGreen ? `${item.quantity} fungu(s)` : `${item.quantity} each`}
              </span>
              <span className="item-total">
                {(item.price * item.quantity).toLocaleString()} TZS
              </span>
            </li>
          ))}
        </ul>
        <div className="checkout-total">
          Total: {getTotal().toLocaleString()} TZS
        </div>
      </div>

      {/* Customer Information */}
      <div className="checkout-card">
        <h2>Customer Information</h2>
        <form>
          <label>
            Name*:
            <input
              type="text"
              name="name"
              value={customerInfo.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </label>
          <label>
          </label>
          <label>
            Phone*:
            <input
              type="tel"
              name="phone"
              value={customerInfo.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              required
            />
          </label>
          <label>
            Address*:
            <textarea
              name="address"
              value={customerInfo.address}
              onChange={handleChange}
              placeholder="Your delivery address"
              required
            />
          </label>
        </form>
      </div>

      {/* Order Notes */}
      <div className="checkout-card">
        <h2>Order Notes</h2>
        <textarea
          name="notes"
          value={customerInfo.notes}
          onChange={handleChange}
          placeholder="Any special instructions or notes"
        />
      </div>

      {/* Place Order Button */}
      <div className="checkout-card">
        <button className="checkout-button" onClick={handlePlaceOrder}>
          Place Order via WhatsApp
        </button>
      </div>
    </div>
  );
}