const searchBar = document.querySelector('.search')
const input = document.querySelector('.input')
const searchResult = document.querySelector('.searchResult')
const searchBtn = document.querySelector('.btn')
const categoryCarousel = document.querySelector('.carouselContainer')
const latestRecipe = document.querySelector('.latestRecipeGrid')

searchBtn.addEventListener('click', () => {
  searchBar.classList.toggle('active')
  input.focus()
})

const searchParams = new URLSearchParams(window.location.search)
const fetchMeals = async (searchInput) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
  const data = await response.json();
  return data.meals;
}

const displayMeals = async () => {
    const searchInput = input.value
    const meals = await fetchMeals(searchInput)
  
    searchResult.innerHTML = ''
  
    if (meals) {
      meals.forEach(meal => {
        const item = document.createElement('li')
  
        item.innerHTML = `<a href='/recipe.html?idMeal=${meal.idMeal}'>${meal.strMeal}</a>`
  
        searchResult.appendChild(item)
      })
    } else {
      const noResultsItem = document.createElement('li')
      noResultsItem.textContent = 'No meals found.'
      searchResult.appendChild(noResultsItem)
    }
  }
  
  input.addEventListener('input', displayMeals)
  
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
 
  

// catergory section

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((response) => response.json())
    .then((data) => {
      const categories = data.categories
      displayCategories(categories)

      setInterval(() => {

      }, 5000)

      console.log(categories)
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

    console.log(latestIngredients)

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


// const fetchMeals = async (searchInput) => {
//   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
//   const data = await response.json();
//   return data.meals;
// }

// 