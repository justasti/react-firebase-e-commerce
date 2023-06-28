import styled from 'styled-components'
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from '../button/button.styles'

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
  overflow: hidden;

  ${BaseButton}, ${GoogleSignInButton}, ${InvertedButton} {
    margin-top: auto;
  }
`

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #eee;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 50px;
    top: 10px;
  }
`

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`
