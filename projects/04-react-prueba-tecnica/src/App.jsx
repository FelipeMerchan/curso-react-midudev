
import { useCatFact } from './hooks/useCatFact';
import { useCatImage } from "./hooks/useCatImage";
import './app.css';

//const catEndpointImageUrl = `https://cataas.com/cat/says/${firstWorld}?size=50&color=red&json=true`

export function App() {
  const { fact, factError, refreshFact } = useCatFact();
  const { imageUrl } = useCatImage({ fact });

  const handleClick = async () => {
    refreshFact();
  };
  
  
  return (
    <main>
      <h1>App</h1>
      <section>
        <button onClick={handleClick}>Get new fact</button>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
        {factError && <p>Hubo un error obteniendo la cita</p>}
      </section>
    </main>
  )
}