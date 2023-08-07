import { createSlice } from "@reduxjs/toolkit";

import type { CartState, StoreState } from "@/types";

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    incrementQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (!item) return;
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decrementQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (!item) return;
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  clearCart,
  deleteItem,
  decrementQuantity,
  incrementQuantity,
} = cartSlice.actions;

export const getCart = (state: StoreState) => state.cart.cart;

export const getItemQuantityById = (id: number) => (state: StoreState) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const getTotalCartPrice = (state: StoreState) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getTotalCartQuantity = (state: StoreState) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
