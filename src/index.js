import debounce from 'lodash.debounce';
import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
input: document.querySelector('#search-box'),
list: document.querySelector('.country-list'),
box: document.querySelector('.country-info'),
}
const BASE_URL = "https://restcountries.com/v3.1/";

function fetchCountries(name) {

    return fetch(`${BASE_URL}name/${name}?`)
.then((response) => response.json())
.catch((error) => {console.log("error", error)})
};


const onInputSearch = (e) => {
const nameCountry = e.target.value.trim().toLowerCase();

if(nameCountry === "") {
    cleanMarkup()
    return;
} 
fetchCountries(nameCountry)
.then(data => insertMarkup(data))
.catch(error => notFound(error));
}


refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

const createMaxMarkup = item => `
<li>
<img src="${item.flags.svg}" width=70px>
<p> ${item.name.official}</p>
<p>Capital: ${item.capital}</p>
<p>Population: ${item.population}</p>
<p>Languages: ${Object.values(item.languages)}</p>
</li>
`;

const createMinMarkup = item => `
<li>
<img src="${item.flags.svg}" width=70px>
<p> ${item.name.official}</p>
</li>
`;


function generateMarkup(array) {
    if(array.length > 10) {
        Notiflix.Notify.warning(
        "Too many matches found. Please enter a more specific name.")} 

    else if(array.length >= 2 && array.length <= 10){            
        return array.reduce((acc, item) => acc + createMinMarkup(item), "")}

     else if(array.length === 1) {
        return array.reduce((acc, item) => acc + createMaxMarkup(item), "") 
    } 
}


const insertMarkup = array => {
    const result = generateMarkup(array);
    refs.list.insertAdjacentHTML('beforeend', result);
}

function cleanMarkup(){
    refs.list.innerHTML = "";
    refs.box.innerHTML = "";
}

      function notFound() {
            Notiflix.Notify.failure('Oops, there is no country with that name')
            cleanMarkup();
        };