//import reactLogo from './assets/react.svg'
import {createBrowserRouter, RouterProvider, useSearchParams} from 'react-router-dom';
import { CreateCategory } from './pages/create-category';
import { ListCategories } from './pages/list-categories';
import { EditCategory } from './pages/edit-category';
import { CreateTransaction } from './pages/create-transaction';
import { ListTransactions } from './pages/list-transactions';
import { EditTransaction } from './pages/edit-transaction';
import { ListFinancies } from './pages/list-financies';
import { ChartReports } from './pages/chart-reports';

const router = createBrowserRouter([
   {
     path: '/category',
     element: <ListCategories />
   },
   {
     path: '/category/add',
     element: <CreateCategory />
   },
   {
     path: '/category/:categoryid',
     element: <EditCategory />
   },
   {
    path: '/transaction/',
    element: <ListTransactions />
  },
  {
    path: '/transactions/:transactionid',
    element: <EditTransaction />
  },
   {
     path: '/transaction/add',
     element: <CreateTransaction />
   },
   {
    path: '/financies/',
    element: <ListFinancies />
  },
  {
    path: '/chartreports/',
    element: <ChartReports />
  },
  ]);

export function App() {
 
  return (
    <>
        <RouterProvider router={router} />   
    </>
  )
}


