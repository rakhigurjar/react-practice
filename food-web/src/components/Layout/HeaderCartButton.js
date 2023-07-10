import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import classes from './HeaderCartButton.module.css'
import CartContext from "../../store/cart-context";

const HeaderCartButton=props=>{
  const[btnHighlighted, setBtnHighlighted] = useState(false)
  const cartCtx = useContext(CartContext)
  const numberOfcartItems = cartCtx.items.reduce((curNumber, item)=>{return curNumber+ item.amount;}, 0);
  const {items} = cartCtx;
  const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump: ''}`
  
  useEffect(()=>{
    if(items.length === 0 ){
      return
    }
    setBtnHighlighted(true);

    const timer = setTimeout(()=>{
      setBtnHighlighted(false);
    }, 300)

    return () => {
      clearTimeout(timer);
    }
  }, [items])

  return(
  <button className={btnClasses} onClick={props.onClick}>
    <span className={classes.icon}>
      <CartIcon/>
    </span>
    <span>your Cart</span>
    <span className={classes.badge}>{numberOfcartItems}</span>
  </button>
  );
};
export default HeaderCartButton; 