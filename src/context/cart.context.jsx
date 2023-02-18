import { createContext, useReducer } from 'react'
import createAction from '../utils/reducer/reducer.utils'

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

export const CartContext = createContext({
  cartOpen: false,
  setCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
  cartItemCount: 0,
})

const ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_OPEN: 'SET_CART_OPEN',
}

const INITIAL_STATE = {
  cartOpen: false,
  cartItems: [],
  cartTotal: 0,
  cartItemCount: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    case ACTION_TYPES.SET_CART_OPEN:
      return {
        ...state,
        cartOpen: payload,
      }
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`)
  }
}

export const CartProvider = ({ children }) => {
  const [{ cartOpen, cartItems, cartItemCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE)

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product)
    updateCartItemsReducer(newCartItems)
  }

  const removeItemFromCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product)
    updateCartItemsReducer(newCartItems)
  }

  const clearItemFromCart = (product) => {
    const newCartItems = clearCartItem(cartItems, product)
    updateCartItemsReducer(newCartItems)
  }

  const setCartOpen = (bool) => {
    dispatch(createAction(ACTION_TYPES.SET_CART_OPEN, bool))
  }

  const updateCartItemsReducer = (newCartItems) => {
    const count = newCartItems.reduce((total, item) => total + item.quantity, 0)
    const total = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    )

    dispatch(
      createAction(ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: total,
        cartItemCount: count,
      })
    )
  }

  const value = {
    cartOpen,
    setCartOpen,
    addItemToCart,
    removeItemFromCart,
    cartItems,
    cartItemCount,
    clearItemFromCart,
    cartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
