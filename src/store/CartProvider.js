import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = function (state, action) {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingItemIndex = state.items.findIndex(
      (cur) => cur.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];

    if (!existingItem) {
      const updatedItems = [action.item, ...state.items];

      return { items: updatedItems, totalAmount: updatedTotalAmount };
    } else {
      const oldItems = state.items.filter((cur) => cur.id !== existingItem.id);

      const updatedItems = [
        { ...existingItem, amount: existingItem.amount + action.item.amount },
        ...oldItems,
      ];

      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
  }

  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (cur) => cur.id === action.id
    );

    const existingItem = state.items[existingItemIndex];

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    if (existingItem.amount === 1) {
      const updatedItems = state.items.filter((cur) => cur.id !== action.id);

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    } else {
      const updatedItems = state.items.filter((cur) => cur.id !== action.id);

      return {
        items: [
          { ...existingItem, amount: existingItem.amount - 1 },
          ...updatedItems,
        ],
        totalAmount: updatedTotalAmount,
      };
    }
  }

  return defaultState;
};

const CartProvider = function (props) {
  // TODO:reducer
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  console.log(cartState);
  // TODO:context
  const addItemToCartHandler = function (item) {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemToCartHandler = function (id) {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
