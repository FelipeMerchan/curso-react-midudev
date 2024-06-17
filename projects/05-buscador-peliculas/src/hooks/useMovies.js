import { useState } from 'react'

import { searchMovies } from '../services/movies';

/* Al tener nuestro custom hook nuestra aplicación
es totalmente agnóstica de lo que está pasando dentro del
custom hook. Por lo cual, podemos trabajar en el useMovies
sin necesidad de tocar nuestra aplicación. Es decir, separamos
las responsabilidades. */
export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const getMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      /* Finally se ejecuta tanto después de el try o del catch */
      setLoading(false);
    }
  }

  return { error, loading, movies, getMovies }
}