import {
  fetchMealsByName,
  fetchMealsByfirstLetter,
  fetchRandomMeal,
  fetchTenRandomMeals,
  fetchMealById,
} from './fetch-helpers';

const parseInstructionsToList = (paragraph) => {
  // Split the paragraph into steps based on a delimiter like numbers, bullets, or newline characters.
  // Adjust the delimiter as needed. Here, we assume numbers with a period (e.g., "1.", "2.") are used.
  // Split the paragraph into sentences by periods followed by a space or end of the string
  const steps = paragraph
    .split(/\.\s+|\.$/)
    .filter((step) => step.trim() !== '');

  // Create an ordered list element
  const ol = document.createElement('ol');

  // Iterate over the steps and add them as list items
  steps.forEach((step) => {
    const li = document.createElement('li');
    li.textContent = step.trim();
    ol.appendChild(li);
  });

  // Return the ordered list element
  return ol;
};

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
  const modalElm = document.createElement('div');
  // Clears the grid of previous meals.
  mealGrid.innerHTML = '';

  //Makes a card for each meal based on name and puts it in grid
  meals.forEach((meal) => {
    const mealCard = document.createElement('div');
    const modalButton = document.createElement('button');
    // modalCloseButton.addEventListener('click', () => {
    //   modalElm.close();
    // });
    // Building out the modal button.
    modalButton.classList.add('btn', 'btn-outline-secondary');
    modalButton.setAttribute('type', 'button');
    modalButton.setAttribute('data-bs-toggle', 'modal');
    modalButton.setAttribute('data-bs-target', `#mealModal`);
    modalButton.textContent = 'More Info';

    // Building out the 'mealCard' DOM element.
    mealCard.classList.add('meal-card');
    mealCard.innerHTML = `<h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>`;
    // Assign a id to the 'mealCard' element using data-*
    mealCard.setAttribute('data-id', meal.idMeal);
    mealCard.appendChild(modalButton);
    mealCard.appendChild(modalElm);

    mealGrid.appendChild(mealCard);
  });
  // Building out the modal.
  modalElm.classList.add('modal', 'fade', 'modal-lg');
  modalElm.id = `mealModal`;
  modalElm.setAttribute('tabindex', -1);
  modalElm.setAttribute('role', 'dialog');
  modalElm.setAttribute('aria-labelledby', 'mealModal');
  modalElm.setAttribute('aria-hidden', true);
  modalElm.innerHTML = `
    <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">None</h5>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
    `;
  document.body.appendChild(modalElm);
};

const displayTenRandomMeal = async () => {
  const tenRandomMeals = await fetchTenRandomMeals();

  displayMeals(tenRandomMeals.meals);
};

const displayModal = async (id) => {
  const mealInfo = await fetchMealById(id);
  const modalElm = document.querySelector('#mealModal');
  modalElm.innerHTML = `
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${mealInfo.meals[0].strMeal}</h5>
      </div>
      <div class="modal-body-instructions">
       
      </div>
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ingredients</h5>
      </div>
      <div class="modal-body-ingredients">
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
  `;
  //Parses the instructions in a ordered list based on the period.
  const parsedInstructions = parseInstructionsToList(
    mealInfo.meals[0].strInstructions
  );
  // Put the ordered list in the body of the modal.
  const modalInstructionsBody = document.querySelector(
    '.modal-body-instructions'
  );
  modalInstructionsBody.appendChild(parsedInstructions);

  //Parses the ingredients into the modal.
  const modalIngredientsBody = document.querySelector(
    '.modal-body-ingredients'
  );
  const modalIndgredientsList = document.createElement('ul');

  // Fills the ingredients modal list.
  let i = 0;
  while (mealInfo.meals[0][`strIngredient${i + 1}`] !== '' || i === 21) {
    const listElement = document.createElement('li');
    listElement.textContent = mealInfo.meals[0][`strIngredient${i + 1}`];
    modalIndgredientsList.appendChild(listElement);
    i++;
  }
  // for (let i = 0; i < 20; i++) {
  //   const listElement = document.createElement('li');
  //   listElement.textContent = mealInfo.meals[0][`strIngredient${i + 1}`];
  //   modalIndgredientsList.appendChild(listElement);
  // }
  modalIngredientsBody.appendChild(modalIndgredientsList);
};

const main = () => {
  //Grabs the form element from the DOM
  const formElm = document.querySelector('#form-search');
  const mealGridElm = document.querySelector('#meal-grid');

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

  // Attaches the click event listener to the mealGrid element.
  mealGridElm.addEventListener('click', (event) => {
    const target = event.target;
    let selectedMealId = null;
    console.log(event);
    if (target.type === 'button') {
      //Get the modal DOM element.
      const modalElm = document.querySelector('#mealModal');

      console.log(modalElm);
      //Gets the parent element of the button.
      const parentElm = target.parentElement;

      //Grabs the data-id attribute of the parent element.
      selectedMealId = parentElm.dataset.id;
      console.log(selectedMealId);
      displayModal(selectedMealId);
    }
  });

  // Populates the search page with exactly 10 meals.
  displayTenRandomMeal();
};

main();
