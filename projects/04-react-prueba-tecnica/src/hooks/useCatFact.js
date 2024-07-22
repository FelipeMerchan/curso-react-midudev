import { useEffect, useState } from "react";

import { getRandomFact } from "../services/facts";

export function useCatFact() {
  const [fact, setFact] = useState();
  const [factError, setFactError] = useState();

  const refreshFact = () => {
    getRandomFact().then(newFact => setFact(newFact)).catch(error => setFactError('No se ha podido recuperar la cita'));
  }

  // Para recuperar la cita al cargar la página
  useEffect(refreshFact, [])

  return {
    fact,
    factError,
    refreshFact,
  }
}