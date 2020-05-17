import React, { useContext } from "react"; //useContext is the hook used to allow use context provider
import PropTypes from "prop-types";

import Thumb from "../../../Thumb";
import { formatPrice } from "../../../../services/utils";
//import { addProduct } from '../../../../services/cart/actions';
import { CartContext } from "../../../../services/cart/context";

export default function Product({ product }) {
  // product.quantity = 1;
  const cartCtx = useContext(CartContext); // now we can use the values which are exposed by the provider item, addToCart etc

  let formattedPrice = formatPrice(product.price, product.currencyId);
  /***
     * let formattedPrice = formatPrice(product.price, product.currencyId);
  
    let productInstallment;
  
    if (!!product.installments) {
      const installmentPrice = product.price / product.installments;
  
      productInstallment = (
        <div className="installment">
          <span>or {product.installments} x</span>
          <b>
            {product.currencyFormat}
            {formatPrice(installmentPrice, product.currencyId)}
          </b>
        </div>
      );
    }***/

  return (
    <div
      className="shelf-item"
      onClick={() => {
        let found = cartCtx.getProduct(product.id);
        if (found) {
          product.quantity = found.quantity + 1;
          cartCtx.addToCart(product);
        } else {
          product.quantity = 0;
          product.quantity = product.quantity + 1;
          cartCtx.addToCart(product);
        }
      }}
      data-sku={product.sku}
    >
      {product.isFreeShipping && (
        <div className="shelf-stopper">Free shipping</div>
      )}
      <Thumb
        classes="shelf-item__thumb"
        src={require(`../../../../static/products/${product.sku}.jpg`)}
        alt={product.title}
      />
      <p className="shelf-item__title">{product.title}</p>
      <div className="shelf-item__price">
        <div className="val">
          <small>{product.currencyFormat}</small>
          <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
        </div>
        {/**productInstallment **/}
      </div>
      <div className="shelf-item__buy-btn">Add to cart</div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
