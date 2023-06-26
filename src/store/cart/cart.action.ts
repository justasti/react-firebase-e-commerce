import { CategoryItem } from '../categories/category.types'
import { CART_ACTION_TYPES, CartItem } from './cart.types.ts'
import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from '../../utils/reducer/reducer.utils.ts'

const addCartItem = (
  cartItems: CartItem[],
  product: CategoryItem
): CartItem[] => {
  if (cartItems.find((cartItem) => cartItem.id === product.id)) {
    return cartItems.map((cartItem) =>
      cartItem.id === product.id
        ? { ...cartItem, quantity: ++cartItem.quantity }
        : cartItem
    )
  }
  return [...cartItems, { ...product, quantity: 1 }]
}

const removeCartItem = (
  cartItems: CartItem[],
  product: CartItem
): CartItem[] => {
  const existingItem = cartItems.find((item) => item.id === product.id)

  if (existingItem && existingItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== product.id)
  }
  return cartItems.map((cartItem) =>
    cartItem.id === product.id
      ? { ...cartItem, quantity: --cartItem.quantity }
      : cartItem
  )
}

const clearCartItem = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export type SetCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_OPEN,
  boolean
>
export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>

export const setCartOpen = withMatcher(
  (bool: boolean): SetCartOpen =>
    createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool)
)

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
)

export const addItemToCart = (cartItems: CartItem[], product: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, product)
  return setCartItems(newCartItems)
}

export const removeItemFromCart = (
  cartItems: CartItem[],
  product: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, product)
  return setCartItems(newCartItems)
}

export const clearItemFromCart = (cartItems: CartItem[], product: CartItem) => {
  const newCartItems = clearCartItem(cartItems, product)
  return setCartItems(newCartItems)
}
