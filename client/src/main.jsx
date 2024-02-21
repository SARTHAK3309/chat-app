import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import AuthPage from './Pages/AuthPage.jsx';
import HomePage from './Pages/HomePage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);




const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
     <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
