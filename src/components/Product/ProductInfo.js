import styled from "styled-components";
import { AiFillStar } from 'react-icons/ai';
import { currency } from "../../helpers";
import { useState, useEffect } from "react";
import useAddToCart from "../../hooks/Cart/useAddToCart";
import useDiscountPrice from "../../hooks/useDiscountPrice";

const Section = styled.div.attrs(() => ({
  className: `flex flex-col space-y-4`
}))``;

const ProductName = styled.h1.attrs(() => ({
  className: `text-lg lg:text-xl font-bold text-gray-800`
}))``;

const StockSection = styled.div.attrs(() => ({
  className: `text-sm text-gray-700`
}))``;

const ProductDescription = styled.div.attrs(() => ({
  className: `text-base lg:text-lg text-gray-700`
}))``;

const ProductRating = styled.div.attrs(() => ({
  className: `flex flex-row space-x-2 items-center`
}))``;

const ProductPriceWrapper = styled.div.attrs(() => ({
  className: `flex flex-col space-y-0`
}))``;

const ProductPrice = styled.div.attrs((props) => ({
  className: `text-lg lg:text-xl font-semibold text-gray-800 ${props.isDiscount && 'line-through decoration-2 decoration-red-500 text-gray-400 text-base'}`
}))``;

const AddToCartButton = styled.button.attrs(() => ({
  className: `bg-primary text-white text-sm rounded-md h-10 hover:bg-secondary`
}))``;

export default function ProductInfo(props) {
  const { product } = props;
  const { addToCartHandler } = useAddToCart();
  const { discountPrice, discountPriceHandler } = useDiscountPrice();
  const arrayRating = new Array(Math.round(product.rating)).fill(' ');

  const [isDiscount, setIsDiscount] = useState(false);

  useEffect(() => {
    if (product.discountPercentage || product.discountPercentage > 0) {
      setIsDiscount(true);
      discountPriceHandler({
        price: product.price,
        discountPercentage: product.discountPercentage
      });
    }
  }, [product, discountPriceHandler]);

  const submitToCartHandler = (params) => {
    const payload = {
      userId: params.userId,
      products: [
        {
          id: params.productId,
          quantity: 1
        }
      ]
    };

    addToCartHandler(payload);
  }

  return (
    <Section>
      <ProductName>
        {product.title} - {product.brand}
      </ProductName>
      <StockSection>
        {product.stock} left in stock
      </StockSection>
      <ProductDescription>
        {product.description}
      </ProductDescription>
      <ProductRating>
        {
          arrayRating.map((item, index) => {
            return (
              <AiFillStar
                key={index}
                className="text-yellow-500 w-6 h-6"
              />
            )
          })
        }
        <div className="text-sm text-gray-500 font-semibold">
          {product.rating}
        </div>
      </ProductRating>
      <ProductPriceWrapper>
        <ProductPrice
          isDiscount={isDiscount}
        >
          $ {currency(product.price)}
        </ProductPrice>
        <ProductPrice>
          $ {currency(discountPrice)}
        </ProductPrice>
      </ProductPriceWrapper>
      <AddToCartButton
        onClick={() => {
          const userId = 1;
          const productId = product.id;
          const quantity = 1;
          const params = {
            userId,
            productId,
            quantity
          };
          submitToCartHandler(params);
        }}
      >
        Add to Cart
      </AddToCartButton>
    </Section>
  )
}
