import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar title="Contact Keeper" icon="fas fa-regular fa-address-card" />
        <div className="container">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/about" Component={About} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
