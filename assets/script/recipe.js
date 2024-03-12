const searchParams = new URLSearchParams(window.location.search)
const ingredientsMeasurement = document.querySelector('.ingredients-Measurement')
const mealImage = document.querySelector('.strMealThumb')
const mealName = document.querySelector('.strMeal')
const mealCategory = document.querySelector('.strCategory')
const mealArea = document.querySelector('.strArea')
const sourceButton = document.querySelector('.strSource')
const youtubeButton = document.querySelector('.strYoutube')
const mealInstructions = document.querySelector('.instructions')

const idMeal = searchParams.get('idMeal')

if (idMeal) {
  // fetch for meal with that id.
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then((response) => response.json())
    .then((data) => displayMealDetails(data.meals[0]))
    .catch((error) => console.error('Error fetching data:', error));
}

const displayMealDetails = (meal) => {
  const mealThumbnail = meal.strMealThumb
  mealImage.src = mealThumbnail;
  mealImage.alt = meal.strMeal;

  mealName.innerHTML = meal.strMeal
  mealCategory.innerHTML = meal.strCategory
  mealArea.innerHTML = meal.strArea

  const listOfIngredients = document.querySelector('.listOfIngredients')
  const listOfMeasurements = document.querySelector('.listOfMeasurements')

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measurement = meal[`strMeasure${i}`]

    if (ingredient) {
      const ingredientItem = document.createElement('li')
      ingredientItem.textContent = ingredient
      listOfIngredients.appendChild(ingredientItem)
    }

    if (measurement) {
      const measurementItem = document.createElement('li')
      measurementItem.textContent = measurement
      listOfMeasurements.appendChild(measurementItem)
    }
  }


  const instructionsList = document.createElement('ol')
  const instructionsSteps = meal.strInstructions.split('\r\n\r\n')

  instructionsSteps.forEach(step => {
    const listIterm = document.createElement('li')
    listIterm.textContent = step
    instructionsList.appendChild(listIterm)
  })

  mealInstructions.appendChild(instructionsList)


  const mealYutubeLink = meal.strYoutube
  const mealSourceLink = meal.strSource

  youtubeButton.href = mealYutubeLink
  sourceButton.href = mealSourceLink

}
console.log('id to fetch', idMeal) 



// backup


// JavaScript
const db = [
  // Your meal database (retrieved from the Meal DB API)
  // Each meal should have properties like name, picture, ingredients, and instructions
  // Example: { name: 'Spaghetti Carbonara', picture: '...', ingredients: [...], instructions: '...' }
];

function displaySearchResults(results) {
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = ''; // Clear previous results

  results.forEach((meal) => {
      const li = document.createElement('li');
      li.textContent = meal.name;
      li.addEventListener('click', () => showMealDetails(meal));
      searchResults.appendChild(li);
  });
}

function showMealDetails(meal) {
  const mealDetails = document.getElementById('mealDetails');
  mealDetails.style.display = 'block';
  mealDetails.innerHTML = `
      <h2>${meal.name}</h2>
      <img src="${meal.picture}" alt="${meal.name}">
      <h3>Ingredients:</h3>
      <ul>
          ${meal.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
      </ul>
      <h3>Instructions:</h3>
      <p>${meal.instructions}</p>
  `;
}

function doSearch() {
  const searchField = document.getElementById('searchField').value;
  const results = db.filter((meal) =>
      meal.name.toLowerCase().includes(searchField.toLowerCase())
  );
  displaySearchResults(results);
}

function search() {
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', doSearch);
}

window.addEventListener('load', search);
