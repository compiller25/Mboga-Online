import { create } from "zustand";

const GREEN_VEG_PRICE = 500; // 1 fungu = 500 TZS
const greenVegetables = [
  "Mchicha",
  "Tembele",
  "Mnavuu",
  "Figiri",
  "Chinnesse",
  "Majani ya Maboga",
];

const useStore = create((set, get) => ({
  cart: [],

  addToCart: (item, quantity = 1) =>
    set((state) => {
      const exists = state.cart.find((i) => i.id === item.id);
      if (exists) {
        // Increase quantity if already in cart
        return {
          cart: state.cart.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }

      // New item
      const price = greenVegetables.includes(item.name)
        ? GREEN_VEG_PRICE
        : item.price;

      const newItem = {
        ...item,
        price,
        quantity,
      };

      return { cart: [...state.cart, newItem] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cart: [] }),

  getTotal: () =>
    get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));

export default useStore;