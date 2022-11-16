import { useState } from "react";

const useDiscountPrice = () => {
  const [discountPrice, setDiscountPrice] = useState(0);

  const discountPriceHandler = (params) => {
    const newPrice = params.price - (Math.round(params.price * params.discountPercentage) / 100);
    setDiscountPrice(newPrice);
  };

  return {
    discountPrice,
    discountPriceHandler
  };
};

export default useDiscountPrice;
