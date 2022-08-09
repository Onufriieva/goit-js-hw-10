import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const refs = {
input: document.querySelector('#search-box'),
list: document.querySelector('.country-list'),
box: document.querySelector('.country-info'),
}
const BASE_URL = "https://restcountries.com/v3.1/";

let inputSearch = "";

const onInputSearch = (e) => {
const name = refs.input.value;
inputSearch = name;
    const url = `${BASE_URL}name/${name}?`;

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        insertMarkup(data)
    })
    .catch((error) => {
        console.log("error", error)
    })
}

console.log(inputSearch)

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

const createMarkup = item => `
<li>
<img src="${item.flags.svg}" width=70px>
<p> ${item.name.official}</p>
<p>Capital: ${item.capital}</p>
<p>Population: ${item.population}</p>
<p>Languages: ${Object.values(item.languages)}</p>
</li>
`;

const generateMarkup = array => array.reduce((acc, item) => acc + createMarkup(item), "");


const insertMarkup = array => {
    const result = generateMarkup(array);
    refs.list.insertAdjacentHTML('beforeend', result);
}

