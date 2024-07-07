import { useEffect, useState } from "react";

import './app.css';

const catEndpointRandomFact = 'https://catfact.ninja/fact';
//const catEndpointImageUrl = `https://cataas.com/cat/says/${firstWorld}?size=50&color=red&json=true`
const catPrefixImageUrl = 'https://cataas.com'

export function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    fetch(catEndpointRandomFact)
      .then(res => res.json())
      .then(data => {
        const { fact } = data;
        setFact(fact);

        const threeFirstWords = fact.split(' ', 3).join(' ');

        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
          .then(res => res.json())
          .then(data => {
            const { url } = data;
            setImageUrl(url);
          })
      })
  }, [])
  
  return (
    <main>
      <h1>App</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={`${catPrefixImageUrl}${imageUrl}`} alt={`Image extracted using the first three words for ${fact}`} />}
      </section>
    </main>
  )
}