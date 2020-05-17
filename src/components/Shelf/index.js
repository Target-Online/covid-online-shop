import React, { Component } from 'react';

//import { fetchProducts } from '../../services/shelf/actions';

//import Spinner from '../Spinner';
import ShelfHeader from './ShelfHeader';
import ProductList from './ProductList';
import products from "../../data/products";

import './style.scss';

export default class Shelf extends Component {

  render() {

   // const { isLoading } = this.state;

    return (
      <React.Fragment>
        {/**isLoading && <Spinner />**/}
        <div className="shelf-container">
          <ShelfHeader productsLength={products.length} />
          <ProductList products={products} />
        </div>
      </React.Fragment>
    );
  }
}


