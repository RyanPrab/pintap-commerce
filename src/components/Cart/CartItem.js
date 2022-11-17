import styled from 'styled-components';
import useDiscountPrice from '../../hooks/useDiscountPrice';
import { useState, useEffect } from 'react';
import { currency } from '../../helpers';
import { FiTrash } from 'react-icons/fi';
import useUpdateCart from '../../hooks/Cart/useUpdateCart';

const ProductWrapper = styled.div.attrs((props) => ({
  className: `flex flex-row justify-between p-2 ${!props.lastIndex && ('border-b-4')}`
}))``;

const ProductInfo = styled.div.attrs(() => ({
  className: `flex flex-col`
}))``;

const ProductName = styled.div.attrs(() => ({
  className: `text-lg lg:text-xl font-bold text-gray-800`
}))``;

const ProductPriceWrapper = styled.div.attrs(() => ({
  className: `flex flex-col space-y-0`
}))``;

const ProductPrice = styled.div.attrs((props) => ({
  className: `text-lg lg:text-xl font-semibold text-gray-800 ${props.isDiscount && 'line-through decoration-2 decoration-red-500 text-gray-400 text-base'}`
}))``;

const ActionWrapper = styled.div.attrs(() => ({
  className: `flex flex-col space-y-2 items-end w-40`
}))``;

const DeleteSection = styled.div.attrs(() => ({
  className: `flex flex-row space-x-2`
}))``;

const TotalProductWrapper = styled.div.attrs(() => ({
  className: `flex flex-row space-x-2 items-center`
}))``;

const QtyWrapper = styled.div.attrs(() => ({
  className: `flex flex-row`
}))``;

const QtyButton = styled.div.attrs(() => ({
  className: `flex bg-primary text-white hover:bg-secondary w-5 justify-center items-center rounded-md cursor-pointer`
}))``;

const QtyProduct = styled.input.attrs(() => ({
  className: `text-center w-5`,
  type: 'text'
}))``;

export default function CartItem(props) {
  const { item, lastIndex } = props;
  const { discountPrice, discountPriceHandler } = useDiscountPrice();
  const [isDiscount, setIsDiscount] = useState(false);
  const [qty, setQty] = useState(item.quantity || 1);
  const [totalPrice, setTotalPrice] = useState(0);
  const { updateCartHandler } = useUpdateCart();

  useEffect(() => {
    if (item.discountPercentage || item.discountPercentage > 0) {
      setIsDiscount(true);
      discountPriceHandler({
        price: item.price,
        discountPercentage: item.discountPercentage
      });
    }
  }, [item, discountPriceHandler]);

  useEffect(() => {
    if (isDiscount) {
      setTotalPrice(discountPrice * qty);
    } else {
      setTotalPrice(item.total * qty);
    };
  }, [isDiscount, item, qty, discountPrice]);

  const updateQtyHandler = (params) => {
    const payload = {
      cartId: params.cartId,
      products: [
        {
          id: params.productId,
          quantity: params.qty
        }
      ]
    };

    updateCartHandler(payload);
  };

  return (
    <ProductWrapper
      lastIndex={lastIndex}
    >
      <ProductInfo>
        <ProductName>
          {item.title}
        </ProductName>
        <ProductPriceWrapper>
          <ProductPrice
            isDiscount={isDiscount}
          >
            $ {currency(item.price)}
          </ProductPrice>
          <ProductPrice>
            $ {currency(discountPrice)}
          </ProductPrice>
        </ProductPriceWrapper>
      </ProductInfo>
      <ActionWrapper>
        <DeleteSection>
          <FiTrash className='w-6 h-6 text-primary'/>
        </DeleteSection>
        <TotalProductWrapper>
          <QtyWrapper>
            <QtyButton
              onClick={() => {
                if (qty < 2) return;
                setQty(parseInt(qty) - 1);
                updateQtyHandler({
                  cartId: 1, // hardcoded because no object from cart response
                  productId: item.id,
                  qty: qty
                });
              }}
            >
              -
            </QtyButton>
            <QtyProduct
              value={parseInt(qty) || ''}
              onChange={e => {
                let value = e.target.value.replace(/[^0-9]/, '');
                value = parseInt(value);

                setQty(value);
              }}
            />
            <QtyButton
              onClick={() => {
                setQty(parseInt(qty) + 1);
                updateQtyHandler({
                  cartId: 1, // hardcoded because no object from cart response
                  productId: item.id,
                  qty: qty
                });
              }}
            >
              +
            </QtyButton>
            <ProductPrice className="ml-2">
              $ {currency(totalPrice)}
            </ProductPrice>
          </QtyWrapper>
        </TotalProductWrapper>
      </ActionWrapper>
    </ProductWrapper>
  )
}
