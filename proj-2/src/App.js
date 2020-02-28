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
          <div className="title">
            <h1 className="main-title">Ghiblia</h1>
            <h2 className="subtitle">A Studio Ghibli Trivia Game</h2>
          </div>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/game">Play Game</NavLink>
          </nav>
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/game" component={Container} />
        </main>
      </div>
    </>
  );
}

export default App;
