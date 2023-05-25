import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils';

const addCartItem = (cartItems, product) => {
  if (cartItems.find((cartItem) => cartItem.id === product.id)) {
    return cartItems.map((cartItem) =>
      cartItem.id === product.id
        ? { ...cartItem, quantity: ++cartItem.quantity }
        : cartItem
    )
  }
  return [...cartItems, { ...product, quantity: 1 }]
}

const removeCartItem = (cartItems, product) => {
  const existingItem = cartItems.find((item) => item.id === product.id)

  if (existingItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== product.id)
  }
  return cartItems.map((cartItem) =>
    cartItem.id === product.id
      ? { ...cartItem, quantity: --cartItem.quantity }
      : cartItem
  )
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

// 

export const setCartOpen = bool => createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool)

export const addItemToCart = (cartItems, product) => {
  const newCartItems = addCartItem(cartItems, product)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, product) => {
  const newCartItems = removeCartItem(cartItems, product)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems, product) => {
  const newCartItems = clearCartItem(cartItems, product)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}