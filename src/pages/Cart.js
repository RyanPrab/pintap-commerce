import styled from "styled-components";
import { useState, useEffect } from "react";
import CartItem from "../components/Cart/CartItem";
import CartAction from "../components/Cart/CartAction";

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
  const [myCart, setMyCart] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const userId = 5;

  const getMyCart = async (id) => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}carts/user/${id}`
      const response = await fetch(endpoint);
      const data = await response.json();
      setMyCart(data);

    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getMyCart(userId);
  }, [userId]);

  useEffect(() => {
    if (myCart) {
      setTotalProducts(myCart.carts[0].totalProducts - 1);
    }
  }, [myCart]);

  return (
    <CartSection>
      <Title>
        My Cart
      </Title>
      <CartWrapper>
        {myCart &&
          <CartList>
            {
              myCart?.carts[0]?.products?.map((item, index) => {
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
          {myCart && <CartAction cart={myCart?.carts[0]}/>}
        </ActionWrapper>
      </CartWrapper>
    </CartSection>
  )
}
