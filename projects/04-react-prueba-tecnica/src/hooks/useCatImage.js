import { useEffect, useState } from "react";

const catPrefixImageUrl = 'https://cataas.com';

export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState();

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

  return {
    imageUrl: `${catPrefixImageUrl}${imageUrl}`,
  };
}
