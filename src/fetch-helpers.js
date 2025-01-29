export const fetchMealLog = async () => {
  const meals = await fetchMealsByltr(); // Waits for the data to be returned
  console.log('Meals data:', meals); // Log the returned data here
};

export const fetchMealsByName = async (name) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
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

export const fetchMealsByfirstLetter = async (letter) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
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

export const fetchRandomMeal = async () => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
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

export const fetchTenRandomMeals = async () => {
  // Creates an array of 10 random meal promises.
  const mealPromises = Array.from({ length: 10 }, () => fetchRandomMeal());

  // Waits for every promise to resolve.
  const mealsResolved = await Promise.all(mealPromises);

  // Combines the meals into a single object.
  const tenRandomMeals = {
    meals: mealsResolved.map((fulfilledMeal) => {
      return fulfilledMeal.meals[0];
    }),
  };

  return tenRandomMeals;
};

export const fetchMealById = async (id) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
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
