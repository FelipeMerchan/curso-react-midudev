import { useCallback, useMemo, useRef, useState } from 'react'

import { searchMovies } from '../services/movies';

/* Al tener nuestro custom hook nuestra aplicación
es totalmente agnóstica de lo que está pasando dentro del
custom hook. Por lo cual, podemos trabajar en el useMovies
sin necesidad de tocar nuestra aplicación. Es decir, separamos
las responsabilidades. */
export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  /* useMemo además de memorizar computaciones también permite
  memorizar el cuerpo de una función: */
  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;
  
    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      /* Finally se ejecuta tanto después de el try o del catch */
      setLoading(false);
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
    /* localeCompare va a comparar con acentos, por ejemplo, á con tilde */
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [movies, sort]);

  return { error, loading, movies: sortedMovies, getMovies }
}