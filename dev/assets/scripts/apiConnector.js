const URL_BASE = "/dataBase/product-";

export const getProductColorDetails = (id = 1, color = 'black') => {
  const url = `${URL_BASE}${id}-${color}.json`;
  return fetch(url)
    .then(data => data.json())
    .then(data => data );
} 

export const getProductColors = (id = 1) => {
  const url = `${URL_BASE}${id}-colors.json`;
  return fetch(url)
    .then(data => data.json())
    .then(data => data );
} 
