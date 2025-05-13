
const DOM = {
    pokimonList: null,
    loader: null,
    flavorText: null,
}

let pokemonsData = [];
function init() {
    DOM.pokimonList = document.getElementById("pokemonList")
    DOM.loader = document.getElementById("loader");
    DOM.flavorText = document.getElementById("flavorText");
    showNames()
}

async function showNames() {
    try {
        showLoader()
        const namesResult = await getPokemonsApi();
        if (!Array.isArray(namesResult.results)) return
        console.log(namesResult)
        namesResult.results.forEach(pokemon => {
            drawPokemonNames(pokemon);
        })
    }
    catch (error) {
        console.log(error)
    }
    finally {
        hideLoader()
        console.log("finally")
    }
};

async function getPokemonsApi() {
    const result = await fetch(`https://pokeapi.co/api/v2/ability/?limit=367&offset=0`)
    const names = await result.json()
    console.log(names)
    return names
}

function drawPokemonNames(pokemon) {

    const li = document.createElement('li')
    li.textContent = pokemon.name


    // console.log(pokemon.url);
    li.addEventListener('click', () => {
        showLoader()
        handlePokemonClick(pokemon.url)
    })


    DOM.pokimonList.appendChild(li)

}

async function handlePokemonClick(url) {
    try {
        const response = await fetchPokemonDetails(url);
        // const flavorTexts = await response.json()
        console.log(response)
        displayFlavorTexts(response)

    } catch (error) {
        console.error("Error fetching or processing data:", error);
        throw error; // Re-throw the error to be caught by the caller
    }
}


async function fetchPokemonDetails(url) {

    try {
        const response = await fetch(url)
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Check if flavor_text_entries exists and is an array
        if (data && Array.isArray(data.flavor_text_entries)) {
            return data.flavor_text_entries.filter(entry => entry.language.name === 'en').map(entry => entry.flavor_text);
        } else {
            console.warn("flavor_text_entries is not an array or doesn't exist", data);
            return []; // Return an empty array to handle the case where the expected data is not there.
        }
    } catch (error) {
        throw error
    }
    finally {
        hideLoader();
        console.log("pass ok in pokemon url ")
    }


}
async function displayFlavorTexts(flavorText) {

    DOM.flavorText.innerHTML = "";

    if (flavorText.length === 0) {
        DOM.flavorText.innerHTML = '<li>No English flavor texts available.</li>';
    }
    else {
        flavorText.forEach(element => {
            const il = document.createElement('il')
            il.textContent = element
            DOM.flavorText.appendChild(il)
        });
    }
}

function showLoader() {
    DOM.loader.style.display = "flex";
}
function hideLoader() {
    DOM.loader.style.display = "none";
}
init();