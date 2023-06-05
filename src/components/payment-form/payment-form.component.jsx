import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { PaymentFormContainer, FormContainer } from './payment-form.styles'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartTotal } from './../../store/cart/cart.selector'
import { selectCurrentUser } from './../../store/user/user.selector'
import { useState } from 'react'
import { emptyCart } from '../../store/cart/cart.reducer'

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const amount = useSelector(selectCartTotal)
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const paymentHandler = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) return

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json())

    const { client_secret } = response.paymentIntent

    setIsProcessingPayment(true)

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'guest',
        },
      },
    })

    setIsProcessingPayment(false)

    if (paymentResult.error) alert(paymentResult.error)
    else if (paymentResult.paymentIntent.status === 'succeeded') {
      alert('payment successful')
      dispatch(emptyCart())
  }
  }

  return (
    amount > 0 && (
      <PaymentFormContainer>
        <FormContainer onSubmit={paymentHandler}>
          <h2>Credit Card Payment:</h2>
          <CardElement />
          <Button
            style={{ marginTop: 30, marginLeft: 'auto' }}
            isLoading={isProcessingPayment}
            buttonType={BUTTON_TYPE_CLASSES.inverted}
          >
            Pay Now
          </Button>
        </FormContainer>
      </PaymentFormContainer>
    )
  )
}
export default PaymentForm
