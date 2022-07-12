import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { Provider as Redux } from 'react-redux'
import store from './Redux/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'


const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  /* <React.StrictMode> */
    <Redux store={store}>
      <App/>
    </Redux>
  /* </React.StrictMode> */
)