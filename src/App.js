import logo from './logo.svg';
import './App.css';
import React from 'react';
import { AuthForm } from './Components/AuthForm';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './Components/RootLayout';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",

      element: <RootLayout />,
      children: 
      [
        {
          path: "/",
          element: <AuthForm />,
        }
      ],
    },
  ]);
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
