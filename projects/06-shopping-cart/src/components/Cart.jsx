import { useId } from "react"
import { CartIcon, ClearCartIcon } from "./Icons";

import './Cart.css'
import { useCart } from "../hooks/useCart";

export function Cart () {
  const cartCheckBoxId = useId();
  const { cart, clearCart } = useCart();

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
          <li>
            <img
              src='https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png'
              alt=''
            />
            <div>
              <strong>Ipohene</strong> - $1499
            </div>

            <footer>
              <small>Qty: 1</small>
              <button>+</button>
            </footer>
          </li>
        </ul>

        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}