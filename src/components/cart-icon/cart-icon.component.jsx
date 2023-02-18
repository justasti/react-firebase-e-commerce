import { CartIconContainer, CartItemCount } from './cart-icon.styles'
import { ShoppingIcon } from './cart-icon.styles'

import React, { useContext } from 'react'
import { CartContext } from '../../context/cart.context'

const CartIcon = () => {
  const { cartOpen, setCartOpen, cartItemCount } = useContext(CartContext)
  const toggleCart = () => {
    setCartOpen(!cartOpen)
  }
  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon />
      <CartItemCount>{cartItemCount}</CartItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
