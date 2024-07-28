import { useId, useState } from 'react'

import './Filters.css'
import { useFilters } from '../hooks/useFilters'

// eslint-disable-next-line react/prop-types
export function Filters () {
  const [minPrice, setMinPrice] = useState(0)
  const { setFilters } = useFilters();
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleChangeMinPrice = (event) => {
    setMinPrice(event.target.value);
    setFilters(prevState => ({
      ...prevState,
      minPrice: event.target.value,
    }))
  }

  const handleChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value,
    }))
  }

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input 
          type='range'
          id={minPriceFilterId}
          min='0'
          max='100'
          onChange={handleChangeMinPrice}
          value={minPrice}
        />
        <span>{minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          <option value='groceries'>Comestibles</option>
          <option value='fragrances'>Fragancias</option>
        </select>
      </div>
    </section>
  )
}
