
import React from 'react';
import '../App.css';
import Controls from './Controls';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../reducers'

function Layout() {
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   );
  return (
    <Provider store={store}>
      <div className="layout">
        <Controls />
      </div>
    </Provider>
  );
}

export default Layout;
