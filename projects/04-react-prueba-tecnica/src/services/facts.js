const catEndpointRandomFact = 'https://catfact.ninja/fact';

export const getRandomFact = () => {
  return fetch(catEndpointRandomFact)
    .then(res => {
      if (!res.ok) {
        throw newError('Error recuperando la cita')
      }

      return res.json()
    })
    .then(data => {
      const { fact } = data;
      return fact;
    })
    .catch((error) => {
      throw newError('No se ha podido recuperar la cita');
    })
}