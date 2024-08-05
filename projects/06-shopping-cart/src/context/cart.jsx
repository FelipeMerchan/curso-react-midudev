import { createContext, useReducer } from 'react'

import { CART_ACTION_TYPES, cartInitialState, cartReducer } from '../reducers/cart'

export const CartContext = createContext()

function useCartReducer () {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = product => dispatch({
    type: CART_ACTION_TYPES.ADD_TO_CART,
    payload: product,
  })

  const removeFromCart = product => dispatch({
    type: CART_ACTION_TYPES.REMOVE_FROM_CART,
    payload: product,
  })

  const clearCart = () => dispatch({ type: CART_ACTION_TYPES.CLEAR_CART })

  return {
    addToCart,
    clearCart,
    removeFromCart,
    state,
  }
}

// eslint-disable-next-line react/prop-types
export function CartProvider ({ children }) {
  const {
    addToCart,
    clearCart,
    removeFromCart,
    state,
  } = useCartReducer()

  return (
    <CartContext.Provider value={{
      cart: state,

      /* Methods */
      addToCart,
      clearCart,
      removeFromCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}