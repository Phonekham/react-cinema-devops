import React from 'react';
import { Provider } from 'react-redux';

import './App.scss';
import Header from './components/header/Header';
import Main from './components/main/Main';

import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
