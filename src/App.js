import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Header } from './Header/Header'
import { ProductList } from './ProductList/ProductList';
import { ProductDetail } from './ProductDetail/ProductDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductList />
  },
  {
    path: "/product/:id",
    element: <ProductDetail />
  },
]);

function App() {
  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
