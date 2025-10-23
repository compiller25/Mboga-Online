import useStore from "../store";
import { useState, useEffect } from "react";
import "./HomePage.css";

const vegetables = [
  { id: 1, name: "Mchicha", price: 500, img: "/images/Spinach.jpg", isGreen: true },
  { id: 2, name: "Tembele", price: 500, img: "/images/Tembele.jpg", isGreen: true },
  { id: 3, name: "Mnavuu", price: 500, img: "/images/mnavu.jpeg", isGreen: true },
  { id: 4, name: "Figiri", price: 500, img: "/images/figiri.jpg", isGreen: true },
  { id: 5, name: "Chinnesse", price: 500, img: "/images/chinnese.jpeg", isGreen: true },
  { id: 6, name: "Majani ya Maboga", price: 500, img: "/images/maboga.jpeg", isGreen: true },
  { id: 7, name: "Pilipili", price: 100, img: "/images/pepper.jpeg", isGreen: false },
  { id: 8, name: "Hoho", price: 200, img: "/images/hoho.jpeg", isGreen: false },
  { id: 9, name: "Karoti", price: 200, img: "/images/karoti.jpeg", isGreen: false },
  { id: 10, name: "Nyanya", price: 200, img: "/images/tomato.jpg", isGreen: false },
  { id: 11, name: "Vitunguu", price: 200, img: "/images/onion.jpg", isGreen: false },
];

export default function HomePage() {
  const addToCart = useStore((state) => state.addToCart);
  const [quantities, setQuantities] = useState({});
  const [clickedButtons, setClickedButtons] = useState({});

  useEffect(() => {
    document.body.classList.add("homepage");
    return () => document.body.classList.remove("homepage");
  }, []);

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: Number(value) });
  };

  const handleAddToCart = (veg) => {
    const qty = veg.isGreen ? 1 : quantities[veg.id] || 1;
    addToCart(veg, qty);

    setClickedButtons({ ...clickedButtons, [veg.id]: true });
    setTimeout(() => {
      setClickedButtons((prev) => ({ ...prev, [veg.id]: false }));
    }, 1000);
  };

  return (
    <div className="page">
      <h1>Welcome to Mboga Online Market</h1>
      <div className="veg-grid">
        {vegetables.map((veg) => (
          <div key={veg.id} className="veg-card">
            <img src={veg.img} alt={veg.name} />
            <h3>{veg.name}</h3>
            <p>{veg.isGreen ? "fungu 1 - 500 TZS" : `@ ${veg.price.toLocaleString()} TZS`}</p>

            {!veg.isGreen ? (
              <div className="quantity-container">
                <input
                  type="number"
                  min="1"
                  value={quantities[veg.id] || 1}
                  onChange={(e) => handleQuantityChange(veg.id, e.target.value)}
                />
                <button
                  onClick={() => handleAddToCart(veg)}
                  className={clickedButtons[veg.id] ? "added-btn" : ""}
                >
                  {clickedButtons[veg.id] ? "Added!" : "Add to Cart"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(veg)}
                className={clickedButtons[veg.id] ? "added-btn" : ""}
              >
                {clickedButtons[veg.id] ? "Added!" : "Add to Cart"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}