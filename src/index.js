import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import 'antd/dist/antd.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter> 
        <App /> 
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
