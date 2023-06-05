import { setIsCartOpen } from '../../store/cart/cart.action'
import {
  selectCartCount,
  selectIsCartOpen,
} from '../../store/cart/cart.selector'
import { CartIconContainer, CartItemCount } from './cart-icon.styles'
import { ShoppingIcon } from './cart-icon.styles'
import { useDispatch, useSelector } from 'react-redux'

const CartIcon = () => {
  const dispatch = useDispatch()
  const cartOpen = useSelector(selectIsCartOpen)
  const cartItemCount = useSelector(selectCartCount)
  const toggleCart = () => {
    dispatch(setIsCartOpen(!cartOpen))
  }
  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon />
      <CartItemCount>{cartItemCount}</CartItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
