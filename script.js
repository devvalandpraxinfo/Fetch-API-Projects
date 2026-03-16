const search = document.getElementById("search");
const submit = document.getElementById("submit");
const heading = document.getElementById("result-heading");
const meals = document.getElementById("meals");
const oneMeal = document.getElementById("one-meal");

// console.log(`${meals} ${oneMeal}`);
// console.log(oneMeal);

// call FETCH API
function findMeal(e) {
  e.preventDefault();
  const item = search.value;
  // console.log(item);
  if (item.trim() === "") {
    alert("please enter meal name");
    heading.innerHTML += "Opps! No result";
  } else {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        
        if (data.meals === null) {
          heading.innerHTML = `Oops! No Result for ${item}`;
        } else {
          heading.innerHTML = `Search meal: ${item}`;

          meals.innerHTML = data.meals.map(
            (meal) => `
            <div class='meal'>
                <img class="meal-items rounded-circle row" src='${meal.strMealThumb}' alt='${meal.strMeal}'>
                
                <div class="meal-info" data-mealId="${meal.idMeal}">
                    <h3 id="meal-name">${meal.strMeal}</h3>
                </div>
                
            </div>`,
          ).join("");

          // console.log(data.meals);
        }
      });
      search.value = " "
  }
}

// get Meal Id
function getSingleItemId(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res)=> res.json())
    .then((data)=>{
      // console.log(data);
      
      const meal = data.meals[0]
      console.log(meal);
      addMealToDOM(meal)
      
    })  
}

function addMealToDOM(meal) {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} -  ${meal[`strMeasure${i}`]} `)
    }else{
      break;
    }   
  }
  console.log(ingredients);
  
}

submit.addEventListener("click", findMeal);

// Single Meal
meals.addEventListener("click", (e)=> {
  const mealInfo = e.composedPath()
  .find((single_item) =>{
  // console.log(single_item);

  if (single_item.classList) {
    return single_item.classList.contains('meal-info')
  } else {
    return false;
  }
  
  })
  // console.log(mealInfo);
  if(mealInfo){
    const mealId = mealInfo.getAttribute('data-mealId')
    console.log(mealId);
    getSingleItemId(mealId)
    
  }
  
})