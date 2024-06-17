import { useEffect, useRef, useState } from "react";

export function useSearch() {
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