import { BrowserRouter,Routes,Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import AddProduct from './components/AddProduct';
import View from './components/View.jsx';
import Update from './components/Update.jsx';
import SingleProduct from './components/SingleProduct.jsx';

function App() {
 

  return (
    <>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<View/>} />
            <Route path='/add' element={<AddProduct/>} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/product/:id" element={<SingleProduct />} />
          </Routes>
        </BrowserRouter>

    </>
  )
}

export default App
