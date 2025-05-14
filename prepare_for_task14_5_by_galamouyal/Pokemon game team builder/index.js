const BASE_URL = 'https://pokeapi.co/api/v2';
const MAX_TEAM_SIZE = 6;

const DOM = {
    pokemonList: null,
    pokemonTeam: null,
    loadingIndicator: null,
    errorMessage: null,
    teamContainer: null,
    teamSummary: null,
    totalPokemonCount: null,
    teamSummaryContent: null,
    pokemonListContainer: null,
};

let allPokemon = [];
let selectedPokemon = [];

function init() {
    DOM.pokemonList = document.getElementById('pokemon-list');
    DOM.pokemonTeam = document.getElementById('pokemon-team');
    DOM.loadingIndicator = document.getElementById('loading');
    DOM.errorMessage = document.getElementById('error-message');
    DOM.teamContainer = document.getElementById('team-container');
    DOM.teamSummary = document.getElementById('team-summary');
    DOM.totalPokemonCount = document.getElementById('total-pokemon-count');
    DOM.teamSummaryContent = document.getElementById('team-summary-content');
    DOM.pokemonListContainer = document.getElementById('pokemon-list-container');

    fetchPokemonList();
}

async function fetchPokemonList() {
    showLoading();
    try {
        const response = await fetch(`${BASE_URL}/pokemon?limit=100`)
        if (!response.ok) {
            throw new Error(`Failed to fetch Pokemon details: ${response.status}`);
        }
        else {
            const data = await response.json()
            allPokemon = data.results;

            displayPokemonList(data.results);
            hideLoading();
        }
    }

    catch (error) {
        displayErrorMessage(error.message);
        hideLoading();
    }

}
// fetch(`${BASE_URL}/pokemon?limit=100`)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`Failed to fetch Pokemon list: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         allPokemon = data.results;
//         displayPokemonList(data.results);
//         hideLoading();
//     })
//     .catch(error => {
//         displayErrorMessage(error.message);
//         hideLoading();
//     });

function displayPokemonList(pokemonList) {
    DOM.pokemonList.innerHTML = '';
    pokemonList.forEach(async pokemon => { // Mark the callback as async
        const listItem = document.createElement('li');
        listItem.textContent = pokemon.name;
        listItem.dataset.url = pokemon.url;

        try {
            // Fetch Pokemon image URL using await
            const response = await fetch(pokemon.url);
            if (!response.ok) {
                throw new Error(`Failed to fetch Pokemon details: ${response.status}`);
            }
            const pokemonData = await response.json();

            const img = document.createElement('img');
            img.src = pokemonData.sprites.front_default;
            img.alt = pokemon.name;
            listItem.insertBefore(img, listItem.firstChild); // Insert image before text

        } catch (error) {
            console.error("Error fetching pokemon image", error);
            // You can set a default image here if you want
            const img = document.createElement('img');
            img.src = `https://via.placeholder.com/64?text=${pokemon.name}`;
            img.alt = pokemon.name;
            listItem.insertBefore(img, listItem.firstChild);
        }

        listItem.addEventListener('click', () => handlePokemonSelect(pokemon.name, pokemon.url));
        DOM.pokemonList.appendChild(listItem);
    });
}
// function displayPokemonList(pokemonList) {
//     DOM.pokemonList.innerHTML = '';
//     pokemonList.forEach(pokemon => {
//         const listItem = document.createElement('li');
//         listItem.textContent = pokemon.name;
//         listItem.dataset.url = pokemon.url;

//         // Fetch Pokemon image URL
//         fetch(pokemon.url)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch Pokemon details: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then(pokemonData => {
//                 const img = document.createElement('img');
//                 img.src = pokemonData.sprites.front_default;
//                 img.alt = pokemon.name;
//                 listItem.insertBefore(img, listItem.firstChild); // Insert image before text
//             })
//             .catch(error => {
//                 console.error("Error fetching pokemon image", error);
//                 // You can set a default image here if you want
//                 const img = document.createElement('img');
//                 img.src = `https://via.placeholder.com/64?text=${pokemon.name}`;
//                 img.alt = pokemon.name;
//                 listItem.insertBefore(img, listItem.firstChild);
//             });

//         listItem.addEventListener('click', () => handlePokemonSelect(pokemon.name, pokemon.url));
//         DOM.pokemonList.appendChild(listItem);
//     });
// }

function handlePokemonSelect(pokemonName, pokemonUrl) {
    if (selectedPokemon.length >= MAX_TEAM_SIZE && !selectedPokemon.includes(pokemonName)) {
        displayErrorMessage(`You can only select up to ${MAX_TEAM_SIZE} Pokemon.`);
        return;
    }
    DOM.errorMessage.classList.add('hidden');

    if (selectedPokemon.includes(pokemonName)) {
        // Remove Pokemon
        selectedPokemon = selectedPokemon.filter(name => name !== pokemonName);
        renderTeam();
    } else {
        // Add Pokemon
        selectedPokemon.push(pokemonName);
        renderTeam();
    }
    updateTeamSummary();
}

function renderTeam() {
    DOM.pokemonTeam.innerHTML = '';
    selectedPokemon.forEach(pokemonName => {
        const listItem = document.createElement('li');
        listItem.textContent = pokemonName;

        // Fetch Pokemon image URL for team display
        fetch(`${BASE_URL}/pokemon/${pokemonName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch Pokemon details: ${response.status}`);
                }
                return response.json();
            })
            .then(pokemonData => {
                const img = document.createElement('img');
                img.src = pokemonData.sprites.front_default;
                img.alt = pokemonName;
                listItem.insertBefore(img, listItem.firstChild);
            })
            .catch(error => {
                console.error("Error fetching pokemon image", error);
                // You can set a default image here if you want
                const img = document.createElement('img');
                img.src = `https://via.placeholder.com/48?text=${pokemonName}`;
                img.alt = pokemonName;
                listItem.insertBefore(img, listItem.firstChild);
            });

        const removeButton = document.createElement('span');
        removeButton.className = 'remove-btn';
        removeButton.textContent = 'x';
        removeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            selectedPokemon = selectedPokemon.filter(name => name !== pokemonName);
            renderTeam();
            updateTeamSummary();
        });
        listItem.appendChild(removeButton);
        DOM.pokemonTeam.appendChild(listItem);
    });
    if (selectedPokemon.length > 0) {
        DOM.teamContainer.classList.remove('hidden');
    }
    else {
        DOM.teamContainer.classList.add('hidden');
    }
}

function updateTeamSummary() {
    DOM.totalPokemonCount.textContent = selectedPokemon.length;
    if (selectedPokemon.length > 0) {
        DOM.teamSummary.classList.remove('hidden');
    } else {
        DOM.teamSummary.classList.add('hidden');
    }
}

function showLoading() {
    DOM.loadingIndicator.classList.add('show');
    DOM.errorMessage.classList.add('hidden');
    DOM.pokemonListContainer.style.display = 'none';
    DOM.teamContainer.classList.add('hidden');
    DOM.teamSummary.classList.add('hidden');
}

function hideLoading() {
    DOM.loadingIndicator.classList.remove('show');
    DOM.pokemonListContainer.style.display = 'block';
}

function displayErrorMessage(message) {
    DOM.errorMessage.textContent = message;
    DOM.errorMessage.classList.remove('hidden');
}

init();