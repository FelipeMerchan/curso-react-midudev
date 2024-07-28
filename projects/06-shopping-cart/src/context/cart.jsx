import { createContext, useState } from 'react'

export const CartContext = createContext()

// eslint-disable-next-line react/prop-types
export function CartProvider ({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = product => {
    /* Validar si el producto ya está en el carrito */
    const productInCartIndex = cart.findIndex((item) => item.id === product.id)
    if (productInCartIndex >= 0) {
      /* structuredClone hace copias profundas de los arrays y de los objetos */
      const newCart = structuredClone(cart)
      newCart[productInCartIndex].quantity += 1
      return setCart(newCart)
    }

    setCart(prevState => ([
      ...prevState,
      {
        ...product,
        quantity: 1,
      }
    ]))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{
      cart,
      /* Methods */
      addToCart,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}