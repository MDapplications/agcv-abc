import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { Provider as Redux } from 'react-redux'
import store from './Redux/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  /* <React.StrictMode> */
    <Redux store={store}>
      <App/>
    </Redux>
  /* </React.StrictMode> */
)