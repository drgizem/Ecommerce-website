
import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminHome from './components/AdminSide/AdminHome';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminAddProduct from './components/AdminSide/AdminAddProduct';
import AdminEdit from './components/AdminSide/AdminEdit';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/adminProductadd" element={<AdminAddProduct/>} />
        <Route path="/adminProductedit" element={<AdminEdit/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
      
    </div>
  );
}

export default App;
