
const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0/';
const TOP_STORIES_URL = `${API_BASE_URL}topstories.json`;

const DOM = {
    storyCardsContainer: document.getElementById('story-cards'),
    loader: document.getElementById('loader'),
    errorContainer: document.getElementById('error-container'),
};

const NUM_STORIES_TO_FETCH = 10;

// Function to show the loading indicator
function showLoader() {
    DOM.loader.style.display = 'flex';
}

// Function to hide the loading indicator
function hideLoader() {
    DOM.loader.style.display = 'none';
}

// Function to display an error message
function displayErrorMessage(message) {
    const errorContainer = DOM.errorContainer;
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
}

// Function to hide the error message
function hideErrorMessage() {
    DOM.errorContainer.style.display = 'none';
    DOM.errorContainer.textContent = '';
}

/**
 * Function to fetch a single story's details.
 * @param {number} storyId - The ID of the story to fetch.
 * @returns {Promise<object>} - A promise that resolves with the story data.
 */
async function fetchStory(storyId) {
    const storyUrl = `${API_BASE_URL}item/${storyId}.json`;
    const response = await fetch(storyUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch story ${storyId}: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
}

/**
 * Function to display a story card in the UI.
 * @param {object} story - The story data object.
 */
function displayStoryCard(story) {
    const card = document.createElement('div');
    card.className = 'story-card';

    const title = document.createElement('h2');
    title.textContent = story.title || 'Untitled';

    const byline = document.createElement('p');
    byline.textContent = `By ${story.by || 'Unknown'}`;

    const time = document.createElement('p');
    time.textContent = `Posted: ${new Date(story.time * 1000).toLocaleDateString()}`; // Convert Unix time

    const link = document.createElement('a');
    link.href = story.url || '#'; // Use '#' if no URL
    link.textContent = story.url ? 'Read More' : 'No Link Available';
    link.target = '_blank'; // Open in new tab

    card.appendChild(title);
    card.appendChild(byline);
    card.appendChild(time);
    card.appendChild(link);

    DOM.storyCardsContainer.appendChild(card);
}

// Function to display skeleton loading cards
function displaySkeletonCards() {
    DOM.storyCardsContainer.innerHTML = ''; // Clear any existing content
    for (let i = 0; i < NUM_STORIES_TO_FETCH; i++) {
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

        DOM.storyCardsContainer.appendChild(card);
    }
}

/**
 * Main function to fetch and display the top stories.
 */
async function fetchAndDisplayTopStories() {
    showLoader();
    displaySkeletonCards(); // Show skeletons while loading
    hideErrorMessage();

    try {
        const response = await fetch(TOP_STORIES_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch top stories: ${response.status} - ${response.statusText}`);
        }
        const topStoryIds = await response.json();

        const storyIdsToFetch = topStoryIds.slice(0, NUM_STORIES_TO_FETCH); // Limit the number of stories

        const storyPromises = storyIdsToFetch.map(fetchStory); // Create an array of promises
        const stories = await Promise.all(storyPromises); // Fetch all stories concurrently

        DOM.storyCardsContainer.innerHTML = ''; // Clear skeleton cards
        stories.forEach(displayStoryCard); // Display the fetched stories

    } catch (error) {
        displayErrorMessage(error.message);
    } finally {
        hideLoader();
    }
}

// Initial call to fetch and display stories
fetchAndDisplayTopStories();
