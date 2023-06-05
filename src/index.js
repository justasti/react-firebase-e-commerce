import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import { PersistGate } from 'redux-persist/integration/react'
import { Elements } from '@stripe/react-stripe-js'

import App from './App'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'
import { stripePromise } from './utils/stripe/stripe.utils';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
        </BrowserRouter>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
)
