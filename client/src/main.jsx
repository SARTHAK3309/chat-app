import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import AuthPage from './Pages/AuthPage.jsx';
import HomePage from './Pages/HomePage.jsx';
import ProtectedRoute from './Pages/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/home",
    element: <ProtectedRoute> <HomePage /> </ProtectedRoute>
  },
 
]);




const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
      <App />
  </React.StrictMode>,
)
