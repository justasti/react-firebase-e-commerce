import { createContext, useEffect, useState } from 'react'

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

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartItemCount, setCartItemCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product))
  }

  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product))
  }

  const clearItemFromCart = (product) => {
    setCartItems(clearCartItem(cartItems, product))
  }

  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0)
    setCartItemCount(count)
  }, [cartItems])

  useEffect(() => {
    const total = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    )
    setCartTotal(total)
  }, [cartItems])

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
