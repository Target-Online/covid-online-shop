import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import CartProvider from "./services/cart/context"
import App from './components/App';
import './index.scss';


//Note we wrapped cartProvider around top most component this will expose our contest/ global state without passing props
ReactDOM.render(
  <CartProvider>
       <App />
  </CartProvider>
,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
