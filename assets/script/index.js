const searchBar = document.querySelector('.search')
const searchInput = document.querySelector('.input')
const searchBtn = document.querySelector('.btn')

searchBtn.addEventListener('click', () => {
  searchBar.classList.toggle('active')
  searchInput.focus()
})


// const searchParams = new URLSearchParams(window.location.search)
// const ingredientsMeasurement = document.querySelector('.ingredients-Measurement')
// const mealImage = document.querySelector('.strMealThumb')
// const mealName = document.querySelector('.strMeal')
// const mealCategoryName = document.querySelector('.strCategory')
// const mealArea = document.querySelector('.strArea')
// const sourceButton = document.querySelector('.strSource')
// const youtubeButton = document.querySelector('.strYoutube')
// const mealInstructions = document.querySelector('.instructions')


// const mealCategory = document.querySelector('.category');

// const catergoryApiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';

// async function fetchDisplayCategoryData() {
//   try {
//     const response = await fetch(catergoryApiUrl);
//     const data = await response.json();

//     // create category div 

//     data.categories.forEach(category => {
//       const div = document.createElement('div')
//       div.classList.add('mealCategory')
//       div.style.backgroundImage = `url(${category.strCategoryThumb})`
//       div.style.borderRadius = '10px'

//       mealCategory.appendChild(div)
//     })

//   } catch (error) {
//     console.error('Error fetching data:', error)
//   }
// }

// fetchDisplayCategoryData()

// const input = document.querySelector('.input')
// const searchResult = document.querySelector('.searchResult')


// const fetchMeals = async (searchInput) => {
//   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
//   const data = await response.json();
//   return data.meals;
// }

// const displayMeals = async () => {
//   const searchInput = input.value
//   const meals = await fetchMeals(searchInput)

//   searchResult.innerHTML = ''

//   if (meals) {
//     meals.forEach(meal => {
//       const item = document.createElement('li')

//       item.innerHTML = `<a href='/recipe.html?idMeal=${meal.idMeal}'>${meal.strMeal}</a>`

//       searchResult.appendChild(item)
//     })
//   } else {
//     const noResultsItem = document.createElement('li')
//     noResultsItem.textContent = 'No meals found.'
//     searchResult.appendChild(noResultsItem)
//   }
// }

// input.addEventListener('input', displayMeals)

// onst idMeal = searchParams.get('idMeal')

// if (idMeal) {
//   // fetch for meal with that id.
//   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
//     .then((response) => response.json())
//     .then((data) => displayMealDetails(data.meals[0]))
//     .catch((error) => console.error('Error fetching data:', error));
// }

// const displayMealDetails = (meal) => {
//   const mealThumbnail = meal.strMealThumb
//   mealImage.src = mealThumbnail;
//   mealImage.alt = meal.strMeal;

//   mealName.innerHTML = meal.strMeal
//   mealCategory.innerHTML = meal.strCategory
//   mealArea.innerHTML = meal.strArea

//   const listOfIngredients = document.querySelector('.listOfIngredients')
//   const listOfMeasurements = document.querySelector('.listOfMeasurements')

//   for (let i = 1; i <= 20; i++) {
//     const ingredient = meal[`strIngredient${i}`]
//     const measurement = meal[`strMeasure${i}`]

//     if (ingredient) {
//       const ingredientItem = document.createElement('li')
//       ingredientItem.textContent = ingredient
//       listOfIngredients.appendChild(ingredientItem)
//     }

//     if (measurement) {
//       const measurementItem = document.createElement('li')
//       measurementItem.textContent = measurement
//       listOfMeasurements.appendChild(measurementItem)
//     }
//   }


//   const instructionsList = document.createElement('ol')
//   const instructionsSteps = meal.strInstructions.split('\r\n\r\n')

//   instructionsSteps.forEach(step => {
//     const listIterm = document.createElement('li')
//     listIterm.textContent = step
//     instructionsList.appendChild(listIterm)
//   })

//   mealInstructions.appendChild(instructionsList)


//   const mealYutubeLink = meal.strYoutube
//   const mealSourceLink = meal.strSource

//   youtubeButton.href = mealYutubeLink
//   sourceButton.href = mealSourceLink

// }
// console.log('id to fetch', idMeal) 
