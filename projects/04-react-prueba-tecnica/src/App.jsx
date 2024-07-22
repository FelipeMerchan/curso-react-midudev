import { useEffect, useState } from "react";

import './app.css';
import { getRandomFact } from "./services/facts";

//const catEndpointImageUrl = `https://cataas.com/cat/says/${firstWorld}?size=50&color=red&json=true`
const catPrefixImageUrl = 'https://cataas.com'

export function App() {
  const [fact, setFact] = useState();
  const [factError, setFactError] = useState();
  const [imageUrl, setImageUrl] = useState();

  // Para recuperar la cita al cargar la página
  useEffect(() => {
    getRandomFact().then(newFact => setFact(newFact));
  }, [])

  // Para recuperar la iamgen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ', 3).join(' ');

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(data => {
        const { _id } = data;
        const url = `/cat/${_id}/says/${threeFirstWords}`;
        setImageUrl(url);
      })
  }, [fact])

  const handleClick = async () => {
    const newFact = await getRandomFact();
    setFact(newFact);
  }
  
  
  return (
    <main>
      <h1>App</h1>
      <section>
        <button onClick={handleClick}>Get new fact</button>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={`${catPrefixImageUrl}${imageUrl}`} alt={`Image extracted using the first three words for ${fact}`} />}
        {factError && <p>Hubo un error obteniendo la cita</p>}
      </section>
    </main>
  )
}