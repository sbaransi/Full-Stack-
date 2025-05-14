
const DOM = {
    pokimonList: null,
    loader: null,
    abilityDescription: null,
    flavorTextList: null,
    abilityFlavorText: null,
    error: null
};

let pokemonsData = [];
const MAX_POKEMON = 367;

function init() {
    DOM.pokimonList = document.getElementById("pokemonList");
    DOM.loader = document.getElementById("loader");
    DOM.abilityDescription = document.getElementById("abilityDescription");
    DOM.flavorTextList = document.getElementById("flavorTextList");
    DOM.abilityFlavorText = document.getElementById("abilityFlavorText");
    DOM.error = document.getElementById("error");
    showNames();
}

async function showNames() {
    try {
        showLoader();
        const namesResult = await getPokemonsApi();
        if (!namesResult || !Array.isArray(namesResult.results)) {
            throw new Error("Invalid data received from API");
        }
        pokemonsData = namesResult.results; // Store the results
        DOM.pokimonList.innerHTML = '';
        namesResult.results.forEach(pokemon => {
            drawPokemonNames(pokemon);
        });
    } catch (error) {
        displayErrorMessage(error.message);
    } finally {
        hideLoader();
    }
}

async function getPokemonsApi() {
    const url = `https://pokeapi.co/api/v2/ability/?limit=${MAX_POKEMON}&offset=0`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch Pokemon abilities. Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // console.error("Error fetching Pokemon abilities:", error);
        throw error;
    }
}

function drawPokemonNames(pokemon) {
    const li = document.createElement('li');
    li.textContent = pokemon.name;
    li.addEventListener('click', () => {
        handlePokemonClick(pokemon.url);
    });
    DOM.pokimonList.appendChild(li);
}

async function handlePokemonClick(url) {
    try {
        showLoader();
        const flavorTexts = await fetchPokemonDetails(url);
        displayFlavorTexts(flavorTexts);
    } catch (error) {
        displayErrorMessage(error.message);
    } finally {
        hideLoader();
    }
}

async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ability details. Status: ${response.status}`);
        }
        const data = await response.json();
        if (data && Array.isArray(data.flavor_text_entries)) {
            return data.flavor_text_entries.filter(entry => entry.language.name === 'en').map(entry => entry.flavor_text);
        } else {
            return [];
        }
    } catch (error) {
        //console.error("Error fetching ability details:", error);
        throw error;
    }
}

function displayFlavorTexts(flavorTexts) {
    DOM.flavorTextList.innerHTML = '';
    DOM.abilityDescription.textContent = "Flavor Text Entries for the selected ability:";
    if (flavorTexts.length === 0) {
        DOM.flavorTextList.innerHTML = '<li>No English flavor texts available.</li>';
        DOM.abilityFlavorText.style.display = 'block';
    } else {
        flavorTexts.forEach(text => {
            const li = document.createElement('li');
            li.textContent = text;
            DOM.flavorTextList.appendChild(li);
        });
        DOM.abilityFlavorText.style.display = 'block';
    }
}

function showLoader() {
    DOM.loader.classList.add('show');
}

function hideLoader() {
    DOM.loader.classList.remove('show');
}

function displayErrorMessage(message) {
    DOM.error.textContent = message;
    DOM.error.style.display = 'block';
}

init();
