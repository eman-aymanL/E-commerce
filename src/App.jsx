
import './App.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Notfound from './Components/NotFound/Notfound';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import AuthContextProvider from './Context/AuthContext';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import ProtectedRoute from './Components/Routes/ProtectedRoute';
import AuthRoute from './Components/Routes/AuthRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';
import BrandsDetails from './Components/BrandsDetails/BrandsDetails';
import Order from './Components/Order/Order';
import AllOrders from './Components/AllOrders/AllOrders';
import { LanguageContextProvider } from './Components/LanguageContext/LanguageContext';
import { Offline } from 'react-detect-offline';

function App() {
  const router = createHashRouter([
    {path:'' , element:<Layout/> , children:[
      {index:true,element: <Home/>},
      {path:'home',element: <Home/>},
      {path:'login',element: <AuthRoute><Login/></AuthRoute>},
      {path:'register',element: <AuthRoute><Register/></AuthRoute>},
      {path:'products',element: <Products/>},
      {path:'categories',element: <Categories/>},
      {path:'brands',element: <Brands/>},
      {path:'cart',element: <ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'order',element: <Order><Cart/></Order>},
      {path:'allorders' , element: <ProtectedRoute> <AllOrders/> </ProtectedRoute>},
      {path:'ProductDetails/:id',element: <ProductDetails/>},
      {path:'categorydetails/:id',element: <CategoryDetails/>},
      {path:'brandsdetails/:id',element: <BrandsDetails/>},
      {path:'*',element: <Notfound/>},
    ]}
  ])
  const client = new QueryClient()
  return (
    <>
    <LanguageContextProvider>
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <CartContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
    </LanguageContextProvider>
    <Offline>
      <div className='bg-black p-5 fixed text-white bottom-0 start-5 end-5'>
        <h1>You are Offline , please check your network</h1>
      </div>
    </Offline>
    </>
    
  

   
    
  )
}

export default App
