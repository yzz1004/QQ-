import React, { Component } from 'react';
import './App.css';
import './common/js/remScale'
import Router from './router'
import Routes from './router/routes'
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router routes={Routes}></Router>
      </div>
    );
  }
}

export default App;
