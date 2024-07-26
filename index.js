document.addEventListener('DOMContentLoaded', (event) => {
    fetchData('margarita'); 
});

async function fetchData(defaultDrink) {
    try {
        const mealName = defaultDrink || document.getElementById('mealName').value.toLowerCase();
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${mealName}`);
        
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        
        const data = await response.json();
        console.log(data);
        
        const resultsContainer = document.getElementById("resultsContainer");
        resultsContainer.innerHTML = '';

        if (data.drinks === null) {
            throw new Error("No drinks found with that name");
        }

        data.drinks.forEach(drink => {
            const drinkName = drink.strDrink;
            const drinkImage = drink.strDrinkThumb;
            const drinkInstructions = drink.strInstructions;
            
            // gather all ingredients
            const ingredients = [];
            for (let i = 1; i <= 15; i++) {
                const ingredient = drink[`strIngredient${i}`];
                const measure = drink[`strMeasure${i}`];
                if (ingredient) {
                    ingredients.push(`${measure ? measure : ''} ${ingredient}`.trim());
                }
            }

            // Creating card elements
            const card = document.createElement("div");
            card.classList.add("card");
            
            const imgElement = document.createElement("img");
            imgElement.src = drinkImage;
            imgElement.alt = drinkName;

            const cardContent = document.createElement("div");
            cardContent.classList.add("card-content");

            const nameElement = document.createElement("h3");
            nameElement.textContent = drinkName;

            const instructionsElement = document.createElement("p");
            instructionsElement.textContent = drinkInstructions;

            const ingredientsElement = document.createElement("div");
            ingredientsElement.classList.add("ingredients");
            const ingredientsTitle = document.createElement("h4");
            ingredientsTitle.textContent = "Ingredients:";
            ingredientsElement.appendChild(ingredientsTitle);

            const ingredientsList = document.createElement("ul");
            ingredients.forEach(ingredient => {
                const ingredientItem = document.createElement("li");
                ingredientItem.textContent = ingredient;
                ingredientsList.appendChild(ingredientItem);
            });
            ingredientsElement.appendChild(ingredientsList);

            // Appending elements to card
            cardContent.appendChild(nameElement);
            cardContent.appendChild(instructionsElement);
            cardContent.appendChild(ingredientsElement);
            card.appendChild(imgElement);
            card.appendChild(cardContent);
            resultsContainer.appendChild(card);
        });
    } catch (error) {
        console.log(error);
    }
}
