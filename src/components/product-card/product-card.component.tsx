import { useDispatch, useSelector } from 'react-redux'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component.tsx'
import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from './product-card.styles.jsx'
import { addItemToCart } from '../../store/cart/cart.action.ts'
import { selectCartItems } from '../../store/cart/cart.selector.ts'
import { CategoryItem } from '../../store/categories/category.types.ts'

type ProductCardProps = {
  product: CategoryItem
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch()
  const { name, price, imageUrl } = product
  const cartItems = useSelector(selectCartItems)

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </ProductCartContainer>
  )
}

export default ProductCard
