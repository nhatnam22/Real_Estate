import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from './ultils/routes.jsx';
import { Provider } from 'react-redux';
import { store} from '@/store/store.js';

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
)

