import { useState } from 'react'
import { Products } from './components/Products'
import './index.css'
import { products as initialProducts } from './mocks/products.json'
import { Header } from './components/Header'

export const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
  });

  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === 'all' || product.category === filters.category)
      )
    })
  }

  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header changeFilters={setFilters} />
      <Products products={filteredProducts} />
    </>
  )
}
