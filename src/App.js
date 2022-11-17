import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useCallback, Suspense } from 'react';
import { notificationAction } from './store/notification-slice';

import Header from './components/Header';
import Notification from './components/Notification';
import Spinner from './components/Spinner';

const Home = React.lazy(() => import('./pages/Home'));
const Product = React.lazy(() => import('./pages/Product'));
const Cart = React.lazy(() => import('./pages/Cart'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

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
        <Suspense
          fallback={
            <div className='flex w-full justify-center'>
              <Spinner/>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/product/:productId" element={<Product/>}/>
            <Route exact path="/cart/:cartId" element={<Cart/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
