import React, { Component} from "react"; //useContext is the hook used to allow use context provider

//import { CartContext } from "../../../services/cart/context";
import PropTypes from 'prop-types';

import Thumb from './../../Thumb';
import { formatPrice } from '../../../services/utils';

class CartProduct extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    removeProduct: PropTypes.func.isRequired,
    changeProductQuantity: PropTypes.func.isRequired,
  };
  
  

  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      isMouseOver: false
    };
  }

  handleMouseOver = () => {
    this.setState({ isMouseOver: true });
  };

  handleMouseOut = () => {
    this.setState({ isMouseOver: false });
  };

  handleOnIncrease = () => {
    const { addToCart } = this.props;
    const { product } = this.state;
    addToCart(product);
  }

  handleOnDecrease = () => {
    const { decreaseProductQauntity } = this.props;
    const { product } = this.state;
    decreaseProductQauntity(product);
  }

  render() {
      
    const { product } = this.state;
    const {removeFromCart} = this.props

    const classes = ['shelf-item'];

    if (!!this.state.isMouseOver) {
      classes.push('shelf-item--mouseover');
    }

    return (
      <div className={classes.join(' ')}>
        <div
          className="shelf-item__del"
          onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          onClick={() => removeFromCart(product.id)}
        />
        <Thumb
          classes="shelf-item__thumb"
          src={require(`../../../static/products/${product.sku}.jpg`)}
          alt={product.title}
        />
        <div className="shelf-item__details">
          <p className="title">{product.title}</p>
          <p className="desc">
            {`${product.availableSizes[0]} | ${product.style}`} <br />
            Quantity: {product.quantity}
          </p>
        </div>
        <div className="shelf-item__price">
          <p>{`${product.currencyFormat}  ${formatPrice(product.price)}`}</p>
          <div>
          <button onClick={this.handleOnDecrease} disabled={product.quantity === 1 ? true : false} className="change-product-button">-</button>
            <button onClick={this.handleOnIncrease} className="change-product-button">+</button>          </div>
        </div>
      </div>
    );
  }
}

export default CartProduct;
