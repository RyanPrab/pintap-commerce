import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { notificationAction } from './store/notification-slice';

import Header from './components/Header';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Notification from './components/Notification';

function App() {
  const notificationState = useSelector(state => state.notification);
  const dispatch = useDispatch();

  const hideNotification = useCallback(() => {
    dispatch(notificationAction.notification({
      status: null,
      title: null,
      message: null
    }));
  },[dispatch]);

  useEffect(() => {
    if (notificationState.isShown) {
      setTimeout(() => {
        hideNotification();
      }, 5000);
    }
  }, [notificationState, hideNotification])

  return (
    <div>
      {notificationState.isShown &&
        <Notification
          status={notificationState.status}
          title={notificationState.title}
          message={notificationState.message}
        />
      }
      <Header/>
      <main className='container mx-auto mt-4 mb-10'>
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
