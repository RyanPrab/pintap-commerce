import styled from "styled-components";
import { useState, useEffect } from "react";
import ProductCategory from "./ProductCategory";

const Section = styled.div.attrs(() => ({
  className: `flex flex-col space-y-2`
}))``;

const Title = styled.div.attrs(() => ({
  className: `text-gray-700 font-semibold text-lg lg:text-xl`
}))``;

const CategoryWrapper = styled.div.attrs(() => ({
  className: `flex flex-nowrap space-x-2 overflow-x-auto`
}))``;

export default function ProductList(props) {
  const { category } = props;
  const [productCategory, setProductCategory] = useState([]);

  const getProductCategoryHandler = async (categoryProduct) => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}products/category/${categoryProduct}`
      const response = await fetch(endpoint);
      const data = await response.json();
      setProductCategory(data);

    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getProductCategoryHandler(category);
  }, [category]);

  if (productCategory) {
    return (
      <Section>
        <Title>
          Realted Products
        </Title>
        <CategoryWrapper>
          {
            productCategory?.products?.map((item, index) => {
              return (
                <ProductCategory
                  key={index}
                  product={item}
                />
              )
            })
          }
        </CategoryWrapper>
      </Section>
    )
  }
}
