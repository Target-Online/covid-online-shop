import React from 'react';

import Product from './Product';

import '../style.scss';
export default function ProductList(props) {
  
    return props.products.map(p => {
    return <Product product={p} key={p.id} />;
  });
};

