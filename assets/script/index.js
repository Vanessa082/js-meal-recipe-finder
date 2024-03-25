const searchBar = document.querySelector('.search')
const input = document.querySelector('.input')
const searchResult = document.querySelector('.searchResult')
const searchBtn = document.querySelector('.btn')
const mealOrigin = document.querySelector('.mealOrigin')
const mealName = document.querySelector('.strMeal')
const MealThumb = document.querySelector('.strMealThumb')
const categoryCarousel = document.querySelector('.carouselContainer')
const latestRecipe = document.querySelector('.latestRecipeGrid')

const fetchMealDetail = async (searchInput) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
  
  console.log('Response status:', response.status)
  
  const data = await response.json()
  
  console.log('API Response:', data)
  
  return data.meals;
}

const displayMeals = async () => {
  const searchInput = input.value
  const meals = await fetchMealDetail(searchInput)
  
  searchResult.innerHTML = ''
  
  if (meals) {
    meals.forEach(meal => {
      const item = document.createElement('li')
      
      item.innerHTML = `<a href='#mealDetails' data-MealId='${meal.idMeal}'>${meal.strMeal}</a>`

      item.onclick = () => displayMealDetails(meal.idMeal);
      
      searchResult.appendChild(item)
    })
  } else {
    const noResultsItem = document.createElement('li')
    noResultsItem.textContent = 'No meals found.'
    searchResult.appendChild(noResultsItem)
  }
}

input.addEventListener('input', displayMeals);

const displayMealDetails = async (mealId) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  const data = await response.json()
  
  console.log('API Response:', data)
  const mealName = document.querySelector('.strMeal')
  const mealCategory = document.querySelector('.strCategory')
  const mealArea = document.querySelector('.strArea')

  mealName.textContent = data.meals[0].strMeal
  mealCategory.textContent = data.meals[0].strCategory
  mealArea.textContent = data.meals[0].strArea
  MealThumb.src = data.meals[0].strMealThumb
  displayIngredientsMeasurements(data) 

}

const displayIngredientsMeasurements = (data) => {
  const listOfIngredients = document.querySelector('.listOfIngredients');
  const listOfMeasurements = document.querySelector('.listOfMeasurements');

  listOfIngredients.innerHTML = '';
  listOfMeasurements.innerHTML = '';

  for (let i = 1; i <= 20; i++) {
    if (data.meals[0][`strIngredient${i}`]) {
      const ingredient = document.createElement('li');
      ingredient.textContent = data.meals[0][`strIngredient${i}`];
      listOfIngredients.appendChild(ingredient);

      const measurement = document.createElement('li');
      measurement.textContent = data.meals[0][`strMeasure${i}`];
      listOfMeasurements.appendChild(measurement);
    } else {
      break;
    }
  }
}
 

// catergory

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((response) => response.json())
    .then((data) => {
      const categories = data.categories
      displayCategories(categories)

      setInterval(() => {

      }, 5000)

      // console.log(categories)
    })
    .catch((error) => console.error('Error fetching data:', error))
})

const displayCategories = (categories) => {

  for (let i = 0; i < categories.length; i++) {
    const carouselItem = document.createElement('div')
    carouselItem.classList.add('carouselItem')

    if (i === 0) {
      carouselItem.classList.add('active')
    }
    const category = categories[i]
    const categoryThumb = category.strCategoryThumb
    const categoryStr = category.strCategory

    const img = document.createElement('img')
    img.src = categoryThumb
    img.alt = categoryStr

    const categoryName = document.createElement('h3')
    categoryName.classList.add('categoryName')
    categoryName.innerHTML = categoryStr

    carouselItem.appendChild(img)
    carouselItem.appendChild(categoryName)
    categoryCarousel.appendChild(carouselItem)
  }

}
