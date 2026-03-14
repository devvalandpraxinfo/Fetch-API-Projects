const search = document.getElementById("search");
const submit = document.getElementById("submit");
const heading = document.getElementById("result-heading");
const meals = document.getElementById("meals");
const oneMeal = document.getElementById("one-meal");

// console.log(`${meals} ${oneMeal}`);
// console.log(heading);

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
submit.addEventListener("click", findMeal);
