// export function fetchUrl(url) {
//     const BASE_URL = "https://restcountries.com/v3.1/";
//     const name = e.target.value.trim().toLowerCase();
//     const url = `${BASE_URL}name/${name}?`;
   
//   return  fetch(url)
//     .then((response) => {
//         if(response.status === 200) {
//             return response.json()}})
//     .catch((error) => {
//         console.log("error", error)
//     })
// }

export const fetchCountries = name => {
    return fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,languages,population,flags`
    ).then(r => {
      if (r.status === 200) {
        return r.json();
      }
      if (r.status === 404) {
        return Promise.reject('not found');
      }
    });
  };