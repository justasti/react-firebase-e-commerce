import { setCartOpen } from '../../store/cart/cart.action.ts'
import {
  selectCartCount,
  selectCartOpen,
} from '../../store/cart/cart.selector.ts'
import {
  CartIconContainer,
  CartItemCount,
  ShoppingIcon,
} from './cart-icon.styles.tsx'
import { useDispatch, useSelector } from 'react-redux'

const CartIcon = () => {
  const dispatch = useDispatch()
  const cartOpen = useSelector(selectCartOpen)
  const cartItemCount = useSelector(selectCartCount)
  const toggleCart = () => {
    dispatch(setCartOpen(!cartOpen))
  }
  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon />
      <CartItemCount>{cartItemCount}</CartItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
