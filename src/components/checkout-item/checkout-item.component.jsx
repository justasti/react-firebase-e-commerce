import { useDispatch } from 'react-redux'
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
} from '../../store/cart/cart.reducer'

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch()
  const { name, imageUrl, price, quantity } = cartItem

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItem))
  const addItemHandler = () => dispatch(addItemToCart(cartItem))
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItem))

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
