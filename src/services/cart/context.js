import React, { useState, createContext } from "react";

//javascipt has undefined means havent defined it yet and null means it been defined but doesnt have a value yet and finally has a value
export const CartContext = createContext(null);

//provide is what we will end up wrapping around the top level of our compents in the root index file/ top level component in our case the store
export default function CartProvider({ children }) {
  const [items, setItems] = useState([]); //initialise state to empty array. Here setItems is our state setter updates state of items

  function addToCart(item) {
    //this is our state setter we can access previous state using callback function
    // ...prevState (built in object)  we spreading privious state on to a new array we working with a mutable data structure append item into array
    setItems((prevState) => [...prevState, item]);
  }

  function removeFromCart(id) {
    setItems((prevState) => prevState.filter((x) => x.id !== id));
  }

  function decreaseProductQauntity(id) {
    const index = (prevState) => prevState.indexOf((x) => x.id === id);
    setItems((prevState) => prevState.splice(index, 1));
  }

  function totalProducts(items) {
    return items.length;
  }

  //reduce gives use new object acc is the accumilator and item is what you adding up so we adding up the second item is starting value empty array
  // number of products the a of item X in the cart it qaunity
  function productWithQauntities(items) {
    return items.reduce((acc, item) => {
      const found = acc.find((_item) => _item.id === item.id);
      //if value is found in our items increment it quantity field else add new value into our items and give it a qauntity equals to 1
      if (found) {
        found.qauntity = found.qauntity + 1;
      } else {
        acc.push({
          qauntity: 1,
          ...item, // all the values that in item pass the into this new object it same as .copy in scala}
        });
      }
      return acc;
    }, []);
  }

  function totalPrice(cartProducts) {
   return cartProducts.reduce((sum, p) => {
      sum += p.price * p.quantity;
      return sum;
    }, 0);
  }

  return (
    // the provide has avalue of what is being persisted and can be access globally by any outside component wrapp arount with this context provide
    //In the context api you can define all sort of functions and data want to expose globally by any of the child components
    //now items will be return with qauntities
    <CartContext.Provider
      value={{
        productWithQauntities: productWithQauntities(items),
        totalPrice: totalPrice(items),
        totalProducts: totalProducts(items),
        addToCart,
        removeFromCart,
        decreaseProductQauntity
      }}
    >
      {children}
    </CartContext.Provider> //this is a built in CartContext instantiated outside
  );
}
