import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = function (props) {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length === 0;

  const cartItemAddHandler = function (item) {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = function (id) {
    cartCtx.removeItem(id);
  };

  const cartItems = cartCtx.items.map((cur) => (
    <CartItem
      key={cur.id}
      name={cur.name}
      price={cur.price}
      amount={cur.amount}
      onAdd={cartItemAddHandler.bind(null, cur)}
      onRemove={cartItemRemoveHandler.bind(null, cur.id)}
    />
  ));

  return (
    <Modal onClose={props.onCloseCart}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {!hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
