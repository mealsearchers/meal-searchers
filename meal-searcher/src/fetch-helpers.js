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

// export const modalRecpieInfo = async ()