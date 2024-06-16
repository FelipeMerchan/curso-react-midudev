import responseMovies from '../mocks/with-results.json'
import withoutResults from '../mocks/no-results.json'

/* Al tener nuestro custom hook nuestra aplicación
es totalmente agnóstica de lo que está pasando dentro del
custom hook. Por lo cual, podemos trabajar en el useMovies
sin necesidad de tocar nuestra aplicación. Es decir, separamos
las responsabilidades. */
export function useMovies() {
  const movies = responseMovies.Search

  const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    image: movie.Poster,
    title: movie.Title,
    year: movie.Year,
  }))

  const getMovies = () => {
    if (search) {

    }
  }

  return { movies: mappedMovies }
}