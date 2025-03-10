import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const client = new QueryClient();

// const router = createBrowserRouter([{
//   path: "/",
//   element: <App />
// },]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <App />
      {/* <RouterProvider router={router} /> */}
    </QueryClientProvider>
  </StrictMode>,
)
