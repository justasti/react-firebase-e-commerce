import { Outlet } from 'react-router-dom'

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import {
  NavigationContainer,
  LogoContainer,
  NavLink,
  NavLinksContainer,
} from './navigation.styles'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/user/user.selector.ts'
import { selectCartOpen } from '../../store/cart/cart.selector.ts'
import { signOutStart } from '../../store/user/user.action.ts'

const Navigation = () => {
  const dispatch = useDispatch()
  const cartOpen = useSelector(selectCartOpen)
  const currentUser = useSelector((state) => selectCurrentUser(state))
  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to='/shop'>SHOP</NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={() => dispatch(signOutStart())}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/login'>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {cartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  )
}

export default Navigation
