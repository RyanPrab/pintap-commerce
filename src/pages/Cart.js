import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import CartItem from "../components/Cart/CartItem";
import CartAction from "../components/Cart/CartAction";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { cartAction } from "../store/cart-slice";

const CartSection = styled.div.attrs(() => ({
  className: `flex flex-col space-y-2`
}))``;

const Title = styled.h1.attrs(() => ({
  className: `text-lg lg:text-xl font-bold text-gray-800`
}))``;

const CartWrapper = styled.div.attrs(() => ({
  className: `flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 justify-center`
}))``;

const CartList = styled.div.attrs(() => ({
  className: `flex flex-col space-y-2 border border-primary rounded-md w-full md:w-3/4`
}))``;

const ActionWrapper = styled.div.attrs(() => ({
  className: `flex w-full md:w-1/2 h-24`
}))``;

export default function Cart() {
  const [totalProducts, setTotalProducts] = useState(0);
  const params = useParams();
  const cartId = params.cartId;
  const dispatch = useDispatch();

  const getMyCart = useCallback(async (id) => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}carts/${id}`
      const response = await fetch(endpoint);
      const data = await response.json();
      dispatch(cartAction.setCart(data));

    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    getMyCart(cartId);
  }, [cartId, getMyCart]);

  const cartState = useSelector(state => state.cart);

  useEffect(() => {
    if (cartState.cart) {
      setTotalProducts(cartState.cart.totalProducts - 1);
    }
  }, [cartState.cart]);

  return (
    <CartSection>
      <Title>
        My Cart
      </Title>
      <CartWrapper>
        {cartState.cart &&
          <CartList>
            {
              cartState.cart?.products?.map((item, index) => {
                return (
                  <CartItem
                    key={index}
                    item={item}
                    lastIndex={index === totalProducts}
                  />
                )
              })
            }
          </CartList>
        }
        <ActionWrapper>
          {cartState.cart && <CartAction cart={cartState.cart}/>}
        </ActionWrapper>
      </CartWrapper>
    </CartSection>
  )
}
