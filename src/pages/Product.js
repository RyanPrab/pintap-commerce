import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductInfo from "../components/Product/ProductInfo";

const ProductSection = styled.div.attrs(() => ({
  className: `flex flex-row space-x-4 items-center`
}))``;

export default function Product() {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const productId = params.productId;

  const getProductHandler = async (id) => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}products/${id}`
      const response = await fetch(endpoint);
      const data = await response.json();
      setProduct(data);

    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    getProductHandler(productId);
  }, [productId]);

  return (
    <ProductSection>
      {product && <ProductInfo product={product} />}
    </ProductSection>
  )
}
