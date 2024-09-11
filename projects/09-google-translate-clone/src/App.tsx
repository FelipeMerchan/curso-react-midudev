import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { useStore } from "./hooks/useStore";

function App() {
  const { fromLanguage, setFromLanguage } = useStore();

  return (
    <>
      <h1>Google Translate</h1>
      <button
        onClick={() => {
          setFromLanguage("es");
        }}
      >
        Cambiar a español
      </button>
      {fromLanguage}
    </>
  );
}

export default App;
