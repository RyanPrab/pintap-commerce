import styled from "styled-components";
import { AiFillStar } from 'react-icons/ai';
import { currency } from "../../helpers";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useDiscountPrice from "../../hooks/useDiscountPrice";

const ProductName = styled.h1.attrs(() => ({
  className: `text-sm lg:text-base font-bold text-gray-800`
}))``;

const ProductRating = styled.div.attrs(() => ({
  className: `flex flex-row space-x-1 items-center`
}))``;

const ProductPriceWrapper = styled.div.attrs(() => ({
  className: `flex flex-col space-y-0`
}))``;

const ProductPrice = styled.div.attrs((props) => ({
  className: `text-sm lg:text-base font-semibold text-gray-800 ${props.isDiscount && 'line-through decoration-2 decoration-red-500 text-gray-400 text-base'}`
}))``;


export default function ProductCategory(props) {
  const { product } = props;
  const arrayRating = new Array(Math.round(product.rating)).fill(' ');
  const { discountPrice, discountPriceHandler } = useDiscountPrice();

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

  return (
    <Link
      className="flex flex-col space-y-2 border border-gray-500 rounded-md p-2"
      to={`/product/${product.id}`}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
      />
      <ProductName>
        {product.title}
      </ProductName>
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
    </Link>
  )
}
