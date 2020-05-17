import React, { Component } from "react";
import CartProduct from "./CartProduct";
import { formatPrice } from "../../services/utils";

import "./style.scss";

export default class FloatCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  openFloatCart = () => {
    this.setState({ isOpen: true });
  };

  closeFloatCart = () => {
    this.setState({ isOpen: false });
  };

  proceedToCheckout = () => {
    const {
      productWithQauntities,
      addToCart,
      decreaseProductQauntity,
      removeFromCart,
      totalPrice,
    } = this.props;

    if (totalPrice == 0) {
      alert("Add some product in the cart!");
    } else {
      alert(`Checkout - Subtotal: R ${formatPrice(totalPrice, "R")}`);
    }
  };

  changeProductQuantity = (changedProduct) => {
    const { cartProducts, updateCart } = this.props;

    const product = cartProducts.find((p) => p.id === changedProduct.id);
    product.quantity = changedProduct.quantity;
    if (product.quantity <= 0) {
      this.removeProduct(product);
    }
    updateCart(cartProducts);
  };

  render() {
    const {
      productWithQauntities,
      addToCart,
      decreaseProductQauntity,
      removeFromCart,
      totalPrice,
      totalProducts,
      getProduct,
    } = this.props;
    const products = productWithQauntities.map((p) => {
      return (
        <CartProduct
          product={p}
          addToCart={addToCart}
          decreaseProductQauntity={decreaseProductQauntity}
          removeFromCart={removeFromCart}
          getProduct={getProduct}
        />
      );
    });

    let classes = ["float-cart"];

    if (!!this.state.isOpen) {
      classes.push("float-cart--open");
    }

    return (
      <div className={classes.join(" ")}>
        {/* If cart open, show close (x) button */}
        {this.state.isOpen && (
          <div
            onClick={() => this.closeFloatCart()}
            className="float-cart__close-btn"
          >
            X
          </div>
        )}

        {/* If cart is closed, show bag with quantity of product and open cart action */}
        {!this.state.isOpen && (
          <span
            onClick={() => this.openFloatCart()}
            className="bag bag--float-cart-closed"
          >
            <span className="bag__quantity">{totalProducts}</span>
          </span>
        )}

        <div className="float-cart__content">
          <div className="float-cart__header">
            <span className="bag">
              <span className="bag__quantity">{totalProducts}</span>
            </span>
            <span className="header-title">Cart</span>
          </div>

          <div className="float-cart__shelf-container">
            {products}
            {!products.length && (
              <p className="shelf-empty">
                Add some products in the cart <br />
                :)
              </p>
            )}
          </div>

          <div className="float-cart__footer">
            <div className="sub">SUBTOTAL</div>
            <div className="sub-price">
              <p className="sub-price__val">
                {` R ${formatPrice(totalPrice, "R")}`}
              </p>
              {/***  <small className="sub-price__installment">
                {!!cartTotal.installments && (
                  <span>
                    {`OR UP TO ${cartTotal.installments} x ${
                      cartTotal.currencyFormat
                    } ${formatPrice(
                      cartTotal.totalPrice / cartTotal.installments,
                      cartTotal.currencyId
                    )}`}
                  </span>
                )}
                    </small>
                    ***/}
            </div>
            <div onClick={() => this.proceedToCheckout()} className="buy-btn">
              Checkout
            </div>
          </div>
        </div>
      </div>
    );
  }
}
