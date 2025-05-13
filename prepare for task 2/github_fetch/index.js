
const API_BASE_URL = 'https://api.github.com/';

const DOM = {
    usernameInput: document.getElementById('username-input'),
    fetchReposButton: document.getElementById('fetch-repos-button'),
    repoCardsContainer: document.getElementById('repo-cards'),
    loader: document.getElementById('loader'),
    errorContainer: document.getElementById('error-container'),
};

/**
 * Function to show the loading indicator.
 */
function showLoader() {
    DOM.loader.style.display = 'flex';
}

/**
 * Function to hide the loading indicator.
 */
function hideLoader() {
    DOM.loader.style.display = 'none';
}

/**
 * Function to display an error message.
 */
function displayErrorMessage(message) {
    const errorContainer = DOM.errorContainer;
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
}

/**
 * Function to hide the error message.
 */
function hideErrorMessage() {
    DOM.errorContainer.style.display = 'none';
    DOM.errorContainer.textContent = '';
}

/**
 * Function to fetch a user's repositories from GitHub.
 * @param {string} username - The GitHub username.
 * @returns {Promise<Array<object>>} - A promise that resolves with an array of repository objects.
 */
async function fetchRepos(username) {
    const reposUrl = `${API_BASE_URL}users/${username}/repos`;
    const response = await fetch(reposUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch repositories for ${username}: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
}

/**
* Function to display a repository card in the UI.
* @param {object} repo - The repository data object.
*/
function displayRepoCard(repo) {
    const card = document.createElement('div');
    card.className = 'repo-card';

    const title = document.createElement('h2');
    title.textContent = repo.name || 'Untitled';

    const description = document.createElement('p');
    description.textContent = repo.description || 'No description';

    const stars = document.createElement('p');
    stars.textContent = `Stars: ${repo.stargazers_count || 0}`;

    const forks = document.createElement('p');
    forks.textContent = `Forks: ${repo.forks_count || 0}`;

    const link = document.createElement('a');
    link.href = repo.html_url || '#';
    link.textContent = 'View on GitHub';
    link.target = '_blank';

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(stars);
    card.appendChild(forks);
    card.appendChild(link);

    DOM.repoCardsContainer.appendChild(card);
}

// Function to display skeleton loading cards
function displaySkeletonCards() {
    DOM.repoCardsContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) { // show 3 skeleton cards
        const card = document.createElement('div');
        card.className = 'skeleton-card';

        const title = document.createElement('div');
        title.className = 'skeleton-title';

        const text1 = document.createElement('div');
        text1.className = 'skeleton-text';

        const text2 = document.createElement('div');
        text2.className = 'skeleton-text';
        const link = document.createElement('div');
        link.className = 'skeleton-link';

        card.appendChild(title);
        card.appendChild(text1);
        card.appendChild(text2);
        card.appendChild(link);

        DOM.repoCardsContainer.appendChild(card);
    }
}

/**
 * Function to handle the button click and fetch/display repositories.
 */
async function handleFetchRepos() {
    const username = DOM.usernameInput.value.trim();

    if (!username) {
        displayErrorMessage('Please enter a GitHub username.');
        return;
    }

    showLoader();
    displaySkeletonCards();
    hideErrorMessage();
    DOM.repoCardsContainer.innerHTML = '';

    try {
        const repos = await fetchRepos(username);
        if (repos.length === 0) {
            displayErrorMessage(`User ${username} has no repositories.`);
            return;
        }
        repos.forEach(displayRepoCard);
    } catch (error) {
        displayErrorMessage(error.message);
    } finally {
        hideLoader();
    }
}

// Event listener for the fetch repositories button
DOM.fetchReposButton.addEventListener('click', handleFetchRepos);
