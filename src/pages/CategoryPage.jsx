import React from 'react';
import { useParams } from 'react-router-dom';

function CategoryPage() {
  const { category } = useParams();
  return (
    <div className="container py-5">
      <h2>Danh mục: {category}</h2>
      <p>Trang danh mục sản phẩm đang được phát triển.</p>
    </div>
  );
}

export default CategoryPage; 