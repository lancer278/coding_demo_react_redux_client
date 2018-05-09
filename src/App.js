import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import hierApp from './reducers/hierApp'

import logo from './logo.svg';
import './App.css';
import Tree from './components/tree.jsx';

const store = createStore(hierApp)

class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 id="banner">Hierarchy builder</h1>
            <img alt="bunny logo" className="App-logo" src={logo}/>
          </header>
          <p className="App-intro">
          </p>
          <Tree />
          </div>
      </Provider>
      );
  }
}

export default App;
