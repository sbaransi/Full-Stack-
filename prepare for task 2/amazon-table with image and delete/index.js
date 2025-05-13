
const API_BASE_URL = 'https://fakestoreapi.com/products';

const productTable = document.getElementById('product-table').querySelector('tbody');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');

/**
 * Displays the loading animation.
 */
function showLoader() {
    loader.style.display = 'flex';
    productTable.innerHTML = `
                <tr class="skeleton-row">
                    <td><span class="skeleton-img"></span></td>
                    <td><span class="skeleton-text"></span></td>
                    <td><span class="skeleton-text"></span></td>
                    <td><span class="skeleton-text"></span></td>
                    <td><span class="skeleton-text"></span></td>
                    <td></td>
                </tr>
                <tr class="skeleton-row">
                    <td><span class="skeleton-img"></span></td>
                    <td><span class="skeleton-text"></span></td>
                    <td><span class="skeleton-text"></span></td>
                    <td><span class="skeleton-text"></span></td>
                    <td><span class="skeleton-text"></span></td>
                     <td></td>
                </tr>
                <tr class="skeleton-row">
                    <td><span class="skeleton-img"></span></td>
                    <td><span class="skeleton-text"></span></td>
                    <td><span class="skeleton-text"></span></td>
                    <td><span class="skeleton-text"></span></td>
                    <td><span class="skeleton-text"></span></td>
                     <td></td>
                </tr>
            `;
}

/**
 * Hides the loading animation.
 */
function hideLoader() {
    loader.style.display = 'none';
}

/**
 * Displays an error message.
 * @param {string} message - The error message to display.
 */
function displayErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

/**
 * Hides the error message.
 */
function hideErrorMessage() {
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
}

/**
 * Fetches products from the API.
 * @returns {Promise<Array>} - A promise that resolves with an array of products.
 */
async function fetchProducts() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

/**
 * Renders the product table.
 * @param {Array} products - An array of products to display.
 */
function renderProducts(products) {
    productTable.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td><img src="${product.image}" alt="${product.title}"></td>
                    <td>${product.title}</td>
                    <td>${product.description}</td>
                    <td>$${product.price}</td>
                    <td>${product.category}</td>
                    <td><button class="delete-button" data-product-id="${product.id}">Delete</button></td>
                `;
        productTable.appendChild(row);

        const deleteButton = row.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            // In a real application, you would send a DELETE request to your server here.
            // For this example, we'll just remove the row from the table.
            row.remove();
        });
    });
}

/**
 * Initializes the application.
 */
async function init() {
    showLoader();
    hideErrorMessage();
    try {
        const products = await fetchProducts();
        renderProducts(products);
    } catch (error) {
        displayErrorMessage(error.message);
    } finally {
        hideLoader();
    }
}

// Call init on page load
init();
