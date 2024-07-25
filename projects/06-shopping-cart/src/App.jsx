import { Products } from './components/Products'
import './index.css'
import { products } from './mocks/products.json'

export const App = () => {
  return (
    <Products products={products} />
  )
}
