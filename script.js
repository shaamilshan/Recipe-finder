const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
});

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    if (!searchValue) return;

    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=7bde17e2&app_key=a9e80acd9b1f63fb91fdbb12be5987e6&from=0&to=10`);
    if (!response.ok) {
        console.error('Failed to fetch recipes');
        return;
    }
    
    const data = await response.json();
    displayRecipes(data.hits);
}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div>
        `;
    });
    resultsList.innerHTML = html;
}
