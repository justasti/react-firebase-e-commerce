import { AnyAction } from 'redux'
import { CartItem } from './cart.types'
import { setCartItems, setCartOpen } from './cart.action'

export type CartState = {
  cartOpen: boolean
  cartItems: CartItem[]
}

const CART_INITIAL_STATE: CartState = {
  cartOpen: false,
  cartItems: [],
}

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setCartOpen.match(action)) {
    return {
      ...state,
      cartOpen: action.payload,
    }
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    }
  }

  return state
}
