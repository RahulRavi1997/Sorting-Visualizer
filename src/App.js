import React from 'react';
import Layout from './containers/Layout';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
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
