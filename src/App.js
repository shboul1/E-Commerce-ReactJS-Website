import { useState, useEffect } from 'react';
import { commerce } from './components/lib/commerce'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout'
import Details from './components/Details/Details'
function App() {

  // Variables
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({});
  


  // Functions
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
    
  }

  const handleAddToCart = async (productId, quantity) => {
    const {cart} = await commerce.cart.add(productId, quantity)
    setCart(cart); 
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const {cart} = await commerce.cart.update(productId, {quantity})
    setCart(cart)
  }

  const handleRemoveFromCart = async (productId) => {
    const {cart} = await commerce.cart.remove(productId)
    setCart(cart)
  }

  const handleEmptyCart = async () => {
    const {cart} = await commerce.cart.empty()
    setCart(cart)
  }


  useEffect(() => {
    fetchProducts();
    fetchCart();
    console.log(products)
  }, [])

  return (
    <div className='app'>
    <Router>
      
      <Navbar totalItems={cart.total_items}/>

    <Switch>

        <Route exact path='/'>
        <Products products={products} handleAddToCart={handleAddToCart} /> 
        </Route>
        
        <Route path='/cart'>
        <Cart
        cart={cart}
        handleUpdateCartQty={handleUpdateCartQty}
        handleRemoveFromCart={handleRemoveFromCart}
        handleEmptyCart={handleEmptyCart}
        />
        </Route>
        
        <Route path='/details/:id'>
          <Details products={products} handleAddToCart={handleAddToCart} />
        </Route>

        <Route exact path='/checkout'>
          <Checkout products={products} cart={cart} />
        </Route>

        
    </Switch>


     </Router>
    </div>
  );
}

export default App;
