import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/inter';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './App.css'
import App from './App.jsx'
import Users from './pages/users/Users';
import UserDetail from './pages/users/UserDetail';
import CreateUser from './pages/users/CreateUser';
import UpdateUser from './pages/users/UpdateUser';
import Categories from './pages/categories/Categories'
import CreateCategory from './pages/categories/CreateCategory';
import CategoryDetail from './pages/categories/CategoryDetail';
import UpdateCategory from './pages/categories/UpdateCategory';
import Products from './pages/products/Products';
import ProductDetail from './pages/products/ProductDetail';
import UpdateProduct from './pages/products/UpdateProduct';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});  
const router = createBrowserRouter([
  {
    path: "/", 
    element: <ApolloProvider client={client}><App /></ApolloProvider>,
    children: [
      {
        path: "users",
        element: <Users />
      },
      {
        path: "createUser",
        element: <CreateUser />
      },
      {
        path: "updateUser/:username",
        element: <UpdateUser />
      },
      {
        path: "userDetail/:username",
        element: <UserDetail />
      },
      {
        path: "categories",
        element: <Categories />
      },
      {
        path: "createCategory",
        element: <CreateCategory />
      },
      {
        path: "updateCategory/:name",
        element: <UpdateCategory />
      },
      {
        path: "categoryDetail/:name",
        element: <CategoryDetail />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "productDetail/:name",
        element: <ProductDetail />
      },
      {
        path: "updateProduct/:name",
        element: <UpdateProduct />
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider  router = {router}/>
  </React.StrictMode>,
)
