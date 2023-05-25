import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from './cart-dropdown.styles.jsx'

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector.js'
import { setCartOpen } from '../../store/cart/cart.action.js'

const CartDropdown = () => {
  const navigate = useNavigate()
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()

  const checkout = () => {
    navigate('/checkout')
    dispatch(setCartOpen(false))
  }
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={checkout}>Checkout</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown
