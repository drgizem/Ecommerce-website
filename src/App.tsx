
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Home } from "./components/Home";
import { CategoryLoader, Categorypart } from "./components/Category";
import { SubCategorypart } from "./components/SubCategory";
import { Productpart } from "./components/Product";
import {SubCategoryLayout} from "./components/SubCategoryLayout";
import { Cart } from "./components/Cart";
import AdminHome from './components/AdminSide/AdminHome';
import AdminAddProduct from './components/AdminSide/AdminAddProduct';
import AdminEdit from './components/AdminSide/AdminEdit';
import Contact from './components/Contact';
import About from './components/About';
import Footer from "./components/Footer";
import { Checkout } from "./components/Checkout";

import RootLayout from "./components/RootLayout";
import { CategoryLayout } from "./components/CategoryLayout";
import {SubCategoryLoader} from "./components/SubCategory"
import {ProductLoader} from "./components/Product"


function App() {

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} >
      <Route index  element={<Home   />}/>
      <Route path="login" element={<Login/>}/>
      <Route path="signup" element={<Signup/>}/>
      <Route path="cart" element={<Cart/>}/>
      <Route path="admin" element={<AdminHome />} />
      <Route path="adminProductadd" element={<AdminAddProduct/>} />
      <Route path="adminProductedit" element={<AdminEdit/>} />
      <Route path="contact" element={<Contact/>} />
      <Route path="about" element={<About/>} />
      <Route path='categories'  >
        <Route index element={<CategoryLayout/>} />
        <Route 
          path=":name" 
          element={<Categorypart/>} 
          loader={CategoryLoader}/>
      </Route>
      <Route path='subcategories'>
        <Route index element={<SubCategoryLayout/>}/>
        <Route
        path=":name"
        element={<SubCategorypart/>}
        loader={SubCategoryLoader}
        />
      </Route>
      <Route path="products" element={<SubCategoryLayout/>}>
        <Route 
        path=":id" 
        element={<Productpart/>}
        loader={ProductLoader}
        />
      </Route>
    </Route>
)
);
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
