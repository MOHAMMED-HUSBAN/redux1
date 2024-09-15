import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>Shopping Cart App</h1>
        <div className="content">
          <ProductList />
          <Cart />
        </div>
      </div>
    </Provider>
  );
};

export default App;
