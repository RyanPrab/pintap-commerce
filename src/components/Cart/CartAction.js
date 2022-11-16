import styled from "styled-components";
import { Link } from "react-router-dom";
import { currency } from "../../helpers";
import { useSelector } from 'react-redux';
import useNotification from "../../hooks/useNotification";

const CartActionSection = styled.div.attrs(() => ({
  className: `flex flex-col space-y-2 border border-primary rounded-md p-2 w-full`
}))``;

const PriceWrapper = styled.div.attrs(() => ({
  className: `flex flex-row justify-between w-full items-center`
}))``;

const TotalPrice = styled.div.attrs(() => ({
  className: `text-lg lg:text-xl font-bold text-gray-800`
}))``;


export default function CartAction(props) {
  const { cart } = props;
  const totalPrice = cart.discountedTotal || cart.total;
  const productState = useSelector(state => state.product);
  const { showNotification } = useNotification();

  return (
    <CartActionSection>
      <PriceWrapper>
        <TotalPrice>
          Total Price
        </TotalPrice>
        <TotalPrice>
          $ {currency(totalPrice)}
        </TotalPrice>
      </PriceWrapper>
      <Link
        className="flex items-center bg-primary text-white hover:bg-secondary justify-center rounded-md h-10"
        to={`/product/${productState.lastSeenProduct}`}
        onClick={() => {
          showNotification({
            status: 'success',
            title: 'Checkout',
            message: 'Your order has been placed'
          });
        }}
      >
        Checkout
      </Link>
    </CartActionSection>
  )
}
