import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductInfo from "../components/Product/ProductInfo";
import ProductImageGallery from "../components/Product/ProductImageGallery";
import ProductList from "../components/Category/ProductList";
import { useDispatch } from 'react-redux';
import { productAction } from "../store/product-slice";

const Section = styled.div.attrs(() => ({
  className: `flex flex-col space-y-10`
}))``;

const ProductSection = styled.div.attrs(() => ({
  className: `flex flex-col md:flex-row md:space-x-4`
}))``;

export default function Product() {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const productId = params.productId;
  const dispatch = useDispatch();

  const lastSeenProductHandler = useCallback((id) => {
    dispatch(productAction.setLastSeen(id));
  },[dispatch]);

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
    lastSeenProductHandler(productId);
  }, [productId, lastSeenProductHandler]);

  return (
    <Section>
      <ProductSection>
        {product && <ProductImageGallery productImages={product.images} />}
        {product && <ProductInfo product={product} />}
      </ProductSection>
      {product && <ProductList category={product.category}/>}
    </Section>
  )
}
