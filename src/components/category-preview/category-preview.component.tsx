import {
  Preview,
  CategoryPreviewContainer,
  CategoryLink,
} from './category-preview.styles'
import ProductCard from '../product-card/product-card.component'
import { CartItem } from '../../store/cart/cart.types'
import { CategoryItem } from '../../store/categories/category.types'

type CategoryPreviewProps = {
  title: string
  products: CategoryItem[]
}

const CategoryPreview = ({ title, products }: CategoryPreviewProps) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryLink to={title}>{title.toUpperCase()}</CategoryLink>
      </h2>
      <Preview>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  )
}
export default CategoryPreview
