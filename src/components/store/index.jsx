import React, { useContext } from "react"; //useContext is the hook used to allow use context provider
import products from "../../data/products";

//import Cart from "../cart"
import { CartContext } from "../../services/cart/context";

export default function Store() {
  const cartCtx = useContext(CartContext); // now we can use the values which are exposed by the provider item, addToCart etc
  return (
    <div>
      {products.map((product) => (
        <div>
          <div>
            <img
              src={require(`../../static/products/${product.sku}.jpg`)}
              alt={product.title}
              width={50}
            />
          </div>
          <div>{product.name}</div>

          <div>
            <button //NB that you use () => {} arrow function so it will delay the execution of the function it form of lazy evaluation ensures the function is executed only on when button is clicked not when rendered
              onClick={() => cartCtx.addToCart(product)} // pass the product object to cartw
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      {cartCtx.items.map((item) => (
        <p>
          {item.title} : {item.qauntity}
        </p>
      ))}
    </div>
  );
}
