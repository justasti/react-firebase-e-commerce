import { useDispatch, useSelector } from 'react-redux'
import {
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Price,
  RemoveButton,
  Quantity,
} from './checkout-item.styles'
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from '../../store/cart/cart.action.ts'
import { selectCartItems } from '../../store/cart/cart.selector.ts'

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch()
  const { name, imageUrl, price, quantity } = cartItem
  const cartItems = useSelector(selectCartItems)

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem))
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem))
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem))

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name> {name} </Name>
      <Quantity>
        <div className='arrow' onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addItemHandler}>
          &#10095;
        </div>
      </Quantity>
      <Price> {price}</Price>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
