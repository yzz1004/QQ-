import React,{Component}from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

Component.prototype.$http=axios

ReactDOM.render(
  <BrowserRouter> <App /></BrowserRouter>,
  document.getElementById('root')
);
