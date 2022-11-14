import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';

function App() {
  return (
    <div>
      <Header/>
      <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:productId" element={<Product/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
      </Routes>
      </main>
    </div>
  );
}

export default App;
