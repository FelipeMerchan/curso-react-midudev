import { useEffect, useState } from "react";

import './app.css';

const catEndpointRandomFact = 'https://catfact.ninja/fact';
//const catEndpointImageUrl = `https://cataas.com/cat/says/${firstWorld}?size=50&color=red&json=true`
const catPrefixImageUrl = 'https://cataas.com'

export function App() {
  const [fact, setFact] = useState();
  const [factError, setFactError] = useState();
  const [imageUrl, setImageUrl] = useState();

  // Para recuperar la cita al cargar la página
  useEffect(() => {
    fetch(catEndpointRandomFact)
      .then(res => {
        if (!res.ok) {
          throw newError('Error recuperando la cita')
        }

        return res.json()
      })
      .then(data => {
        const { fact } = data;
        setFact(fact);
      })
      .catch((error) => {
        setFactError('No se ha podido recuperar la cita');
      })
  }, [])

  // Para recuperar la iamgen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ', 3).join(' ');

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(data => {
        const { url } = data;
        setImageUrl(url);
      })
  }, [fact])
  
  
  return (
    <main>
      <h1>App</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={`${catPrefixImageUrl}${imageUrl}`} alt={`Image extracted using the first three words for ${fact}`} />}
        {factError && <p>Hubo un error obteniendo la cita</p>}
      </section>
    </main>
  )
}