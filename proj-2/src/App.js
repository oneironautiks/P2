import React from 'react';
import './App.css';
import { NavLink, Route } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Container from './components/Container';

function App() {
  return (
    <>
      <div className="App">
        <header>
          <h1>Ghiblia: A Studio Ghibli Trivia Game</h1>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/game">Play Game</NavLink>
          </nav>
        </header>
      </div>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/game" component={Container} />
      </div>
    </>
  );
}

export default App;
