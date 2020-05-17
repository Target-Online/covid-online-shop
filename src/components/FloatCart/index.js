import React, {useContext } from "react";
import { CartContext } from "../../services/cart/context";
import FloatCart from "./FloatCart";

export default function HookingState() {
  const cartCtx = useContext(CartContext); // now we can use the values which are exposed by the provider item, addToCart etc
  console.log(cartCtx.totalPrice);
  return (
    <FloatCart
      productWithQauntities={cartCtx.productWithQauntities}
      addToCart={cartCtx.addToCart}
      decreaseProductQauntity={cartCtx.decreaseProductQauntity}
      removeFromCart={cartCtx.removeFromCart}
      totalPrice={cartCtx.totalPrice}
      totalProducts={cartCtx.totalProducts}
    />
  );
}
