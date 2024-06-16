import { useEffect, useState, useRef } from 'react';

import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies';

function useSearch() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  /* isFirstInput que usa useRef es una bandera para saber
  si es el primer render del formulario debido a que tenemos
  una validación (search === '') que da true cuando el usuario
  apenas ha llegado a la página loq ue ocasiona que se setee un error
  (setError('No se puede buscar una película vacía')) cuando no es necesario. */
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { error, search, setSearch } 
}

function App() {
  /* useRef permite crear una referencia mutable que persiste
  durante todo el ciclo de vida del componente. Es útil para guardar
  cualquier valor que podamos mutar como un identificador, un elemento
  del DOM, un contador, etc; y que cada vez que cambia no vuelve a renderizar
  el componente y esto es lo que hace useRef al useState. */
  const { movies } = useMovies();
  const { error, search, setSearch } = useSearch()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ search })
  }

  const handleChange = (event) => {
    const newQuery = event.target.value;
    if (newQuery.startsWith(' ')) return
    setSearch(newQuery);
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit} >
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleChange}
            value={search}
            name='query'
            placeholder='Avengers, Star Wars, The Matrix...'
          />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
