import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = function (props) {
  const [isBtnAni, setIsBtnAni] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfCardItems = cartCtx.items.reduce(
    (acc, cur) => acc + cur.amount,
    0
  );

  const { items } = cartCtx;

  const btnClasses = `${classes.button} ${isBtnAni ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) return;
    setIsBtnAni(true);

    const timer = setTimeout(() => {
      setIsBtnAni(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCardItems}</span>
    </button>
  );
};

export default HeaderCartButton;
