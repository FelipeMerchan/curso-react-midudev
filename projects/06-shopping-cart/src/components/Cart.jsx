/* eslint-disable react/prop-types */
import { useId } from "react"
import { CartIcon, ClearCartIcon } from "./Icons";

import './Cart.css'
import { useCart } from "../hooks/useCart";

function CartItem ({ addToCart, thumbnail, price, title, quantity }) {
  return (
    <li>
      <img
        src={thumbnail}
        alt={title}
      />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}

export function Cart () {
  const cartCheckBoxId = useId();
  const { addToCart, cart, clearCart } = useCart();

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckBoxId}>
        <CartIcon />
      </label>
      <input
        type='checkbox'
        hidden
        id={cartCheckBoxId}
      />
      <aside className="cart">
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>

        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}