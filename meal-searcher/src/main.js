import { fetchMealsByName, fetchMealsByfirstLetter } from './fetch-helpers';

const searchMeals = async (searchQuery) => {
  let fetchedMeals = null;

  // Checks whether a single letter or full meal name was searched.
  if (searchQuery.length === 1) {
    //Searches the meal based on the first letter.
    fetchedMeals = await fetchMealsByfirstLetter(searchQuery);
  } else {
    // Searches the meal based on the name.
    fetchedMeals = await fetchMealsByName(searchQuery);
  }

  //Guard clause to check if a meal was found that matched the search query.
  if (!fetchedMeals.meals) {
    // Alert the user that a meal was not found.
    alert('Error: Meal was not found!');
  } else {
    // Parses the retrieved meals data
    displayMeals(fetchedMeals.meals);
  }
};

const displayMeals = (meals) => {
  const mealGrid = document.getElementById('meal-grid');

  mealGrid.innerHTML = '';

  //Makes a card for each meal based on name and puts it in grid
  meals.forEach((meal) => {
    const mealCard = document.createElement('div');
    mealCard.classList.add('meal-card');

    mealCard.innerHTML = `<h3>${meal.strMeal}</h3>
        <div class="meal-button-layout">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <button class="open-modal">See More!</button>
        </div>`;

    mealGrid.appendChild(mealCard);
  });
};

const main = () => {
  //Grabs the form element from the DOM
  const formElm = document.querySelector('#form-search');
  // Attaches a submit event listener to the search button.
  formElm.addEventListener('submit', (event) => {
    //Prevent the default behavior.
    event.preventDefault();

    console.log(event);

    //Get the selected form element.
    const formElm = event.target;

    //Grab the value of the input element.
    const inputValue = formElm.elements['0'].value;

    //Pass that search query to the search helper function.
    searchMeals(inputValue);
  });
}; 



//event listener for opening modal
document.body.addEventListener('click', (event) => {
    //checks if the button has opening class
    if (event.target.classList.contains('open-modal')) {
        //makes the modal and hides itx
      const modal = document.createElement('div');
      const modalContent = document.createElement('div');
      modal.className = 'modal';
      modalContent.className = 'modal-content';
      modal.style.display = 'none'; 
      
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
      //displays modal after pressed
      modal.style.display = '';
    }
  });
 
main();
