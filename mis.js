// Define constants for API URL and the search button
const API_URL = 'https://restcountries.com/v2/name/';
const searchButton = document.getElementById('search-btn');

// Add event listener to search button
searchButton.addEventListener('click', searchCountry);

// Define function to search for country
function searchCountry() {
  // Get input value
  const input = document.getElementById('country-input').value;

  // Construct URL and fetch data
  fetch(API_URL + input)
    .then(response => response.json())
    .then(data => {
      // Clear previous search results
      const countryList = document.getElementById('country-list');
      countryList.innerHTML = '';

      // Create and append list items for each country
      data.forEach(country => {
        const listItem = document.createElement('div');
        listItem.classList.add('col-md-3', 'col-sm-6', 'text-center', 'mb-3');
        const flagImg = document.createElement('img');
        flagImg.classList.add('img-fluid', 'mb-2');
        flagImg.setAttribute('src', country.flag);
        flagImg.setAttribute('alt', `${country.name} flag`);
        const countryName = document.createElement('h4');
        countryName.classList.add('font-weight-bold', 'mb-2');
        countryName.textContent = country.name;
        const detailsButton = document.createElement('button');
        detailsButton.classList.add('btn', 'btn-primary');
        detailsButton.textContent = 'Show More Details';
        detailsButton.addEventListener('click', () => showDetails(country));
        listItem.appendChild(flagImg);
        listItem.appendChild(countryName);
        listItem.appendChild(detailsButton);
        countryList.appendChild(listItem);
      });
    })
    .catch(error => console.log(error));
}

// Define function to show more details for a country
function showDetails(country) {
  // Populate modal with data
  const modalTitle = document.getElementById('country-modal-title');
  modalTitle.textContent = country.name;
  const flagImg = document.getElementById('country-flag');
  flagImg.setAttribute('src', country.flag);
  flagImg.setAttribute('alt', `${country.name} flag`);
  const population = document.getElementById('country-population');
  population.textContent = country.population.toLocaleString();
  const capital = document.getElementById('country-capital');
  capital.textContent = country.capital;
  const region = document.getElementById('country-region');
  region.textContent = country.region;
  const subregion = document.getElementById('country-subregion');
  subregion.textContent = country.subregion;
  const currency = document.getElementById('country-currency');
  currency.textContent = `${country.currencies[0].name} (${country.currencies[0].code})`;

  // Show modal
  $('#country-modal').modal('show');
}
