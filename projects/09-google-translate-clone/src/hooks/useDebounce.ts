import { useEffect, useState } from "react"

/* Para que la persona que use el custom hook nos indique cuál es el valor que va a enviar en value
podemos usar <T>. Al momento de usar el useDebounce podemos definirle el tipo, por ejemplo:
useDebounce<string>('hello', 500): */
export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}