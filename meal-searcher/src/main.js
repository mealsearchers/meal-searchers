const fetchMealsByltr = async () => {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?f=b'
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Fetched data:', data);
    return data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const displayMeals = async () => {
  const mealsData = await fetchMealsByltr();
  const meals = mealsData.meals;

  const mealGrid = document.getElementById('meal-grid');

  mealGrid.innerHTML = '';

  //Makes a card for each meal based on name and puts it in grid
  meals.forEach((meal) => {
    const mealCard = document.createElement('div');
    mealCard.classList.add('meal-card');

    mealCard.innerHTML = `<h3>${meal.strMeal}</h3>
        <div><img src="${meal.strMealThumb}" alt="${meal.strMeal}"/></div>`;

    mealGrid.appendChild(mealCard);
  });
};

const fetchMealLog = async () => {
  const meals = await fetchMealsByltr(); // Waits for the data to be returned
  console.log('Meals data:', meals); // Log the returned data here
};

const main = () => {
  // Fills the grid with the fetched data from the API
  displayMeals();
};

main();
