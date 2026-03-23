import ProductCard from "../product-card/product-card.component";

import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles";

type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

type CategoryPreviews = {
  title: string;
  products: Product[];
};

const CategoryPreview = ({ title, products }: CategoryPreviews) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title.toLowerCase()}>
          {title.toUpperCase()}
        </Title>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
