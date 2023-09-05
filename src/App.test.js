import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './App';
import {Provider} from "react-redux";
import {BrowserRouter, HashRouter} from "react-router-dom";
import store from './redux/redux-store'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
      <MainApp/>
    </BrowserRouter>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
