const searchBar = document.querySelector('.search')
const input = document.querySelector('.input')
const searchResult = document.querySelector('.searchResult')
const searchBtn = document.querySelector('.btn')
const mealOrigin = document.querySelector('.mealOrigin')
const mealName = document.querySelector('.strMeal')
const categoryCarousel = document.querySelector('.carouselContainer')
const latestRecipe = document.querySelector('.latestRecipeGrid')

searchBtn.addEventListener('click', () => {
  searchBar.classList.toggle('active')
  input.focus()
})


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
 
  

// catergory section

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


async function latestRecipeIngredients (){
  try{
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')

    if(!response.ok){
      throw new Error(`Error fecthing data:${response.status} `)
    }

    const data = await response.json()
    const latestIngredients = data.meals

    // console.log(latestIngredients)

    for(let i = 0; i < 20; i++){
      const ingredientDiv = document.createElement('div')
      ingredientDiv.classList.add('ingredient')

      const ingredientName = document.createElement('h3')
      ingredientName.textContent = latestIngredients[i].strIngredient
      
      const ingredientDescription = document.createElement('div')
      ingredientDescription.textContent = latestIngredients[i].strDescription
      
      ingredientDiv.appendChild(ingredientName)
      ingredientDiv.appendChild(ingredientDescription) 
      latestRecipe.appendChild(ingredientDiv)
    }
    
  }catch(error){
    console.error(error)
  }
}

window.onload = latestRecipeIngredients


// const searchParams = new URLSearchParams(window.location.search)
// const ingredientsMeasurement = document.querySelector('.ingredients-Measurement')
// const mealImage = document.querySelector('.strMealThumb')
// const mealName = document.querySelector('.strMeal')
// const mealCategoryName = document.querySelector('.strCategory')
// const mealArea = document.querySelector('.strArea')
// const sourceButton = document.querySelector('.strSource')
// const youtubeButton = document.querySelector('.strYoutube')
// const mealInstructions = document.querySelector('.instructions')
 


// const input = document.querySelector('.input')
// const searchResult = document.querySelector('.searchResult')


// const fetchMealDetail = async (searchInput) => {
//   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
//   const data = await response.json();
//   return data.meals;
// }

// 