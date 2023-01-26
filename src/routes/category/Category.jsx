import React, { useContext, useState, useEffect } from 'react';

import { CategoriesContext } from '../../context/CategoriesContext';

import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/ProductCard';

import './category-styles.scss';

const Category = () => {
  const [products, setProducts] = useState([]);

  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  console.log(products);

  return (
    <>
      <h2 className="category-title">{category}</h2>
      <div className="category-container">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Category;
