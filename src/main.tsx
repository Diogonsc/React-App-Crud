import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import ErrorPage from './pages/ErrorPage/index.tsx'
import RegistrationPage from './pages/Registration/index.tsx'

async function deferRender() {
  const { worker } = await import('./mocks/browser')
  return worker.start()
}

const mainRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <RegistrationPage />
      },
    ]
  }
])

deferRender().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={mainRouter} />
    </React.StrictMode>
  );
})
