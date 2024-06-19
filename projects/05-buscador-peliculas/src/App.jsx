import { useState } from 'react';

import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';
import './App.css'

function App() {
  const [sort, setSort] = useState(false);
  /* useRef permite crear una referencia mutable que persiste
  durante todo el ciclo de vida del componente. Es útil para guardar
  cualquier valor que podamos mutar como un identificador, un elemento
  del DOM, un contador, etc; y que cada vez que cambia no vuelve a renderizar
  el componente y esto es lo que hace useRef al useState. */
  const { error, search, setSearch } = useSearch();
  const { loading, movies, getMovies } = useMovies({ search, sort });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  }

  const handleSort = () => {
    setSort(!sort);
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
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
