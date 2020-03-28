import React from 'react';
import Layout from './containers/Layout';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="folder1">
          <Route exact path="/"  component={App1} />
    </BrowserRouter>
  )
}
  function App1() {
  return (
      <div className="app">
        <header className="app-header">
          Sorting Visualizer
      </header>
        <Layout />
      </div>
  );
}

export default App;
