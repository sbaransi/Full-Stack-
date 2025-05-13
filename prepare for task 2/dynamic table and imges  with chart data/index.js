
const API_URL = 'https://jsonplaceholder.typicode.com/photos'; // Example API

const DOM = {
    table: document.getElementById('data-table'),
    errorContainer: document.getElementById('error-container'),
    loader: document.getElementById('loader'),
    chartCanvas: document.getElementById('myChart'),
    favoritesList: document.getElementById('favorites-list')
};

let chartInstance = null;
let tableData = [];
let favorites = [];

function fetchData() {
    showLoader();
    hideErrorMessage();
    DOM.table.classList.add('sk-loading');

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            tableData = data;
            updateUI(data);
        })
        .catch(error => {
            displayErrorMessage(error.message);
        })
        .finally(() => {
            hideLoader();
        });
}

function updateUI(data) {
    if (!data || data.length === 0) {
        displayErrorMessage('No data received from the API.');
        return;
    }

    const headers = Object.keys(data[0]);
    headers.push('Actions');
    createTableHeader(headers);
    createTableBody(data);
    renderChart(data);
    DOM.table.classList.remove('sk-loading');
}

function createTableHeader(headers) {
    const thead = DOM.table.querySelector('thead');
    thead.innerHTML = '';
    const row = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        row.appendChild(th);
    });
    thead.appendChild(row);
}

function createTableBody(data) {
    const tbody = DOM.table.querySelector('tbody');
    tbody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        for (const key in item) {
            const td = document.createElement('td');
            if (key === 'thumbnailUrl') {
                const img = document.createElement('img');
                img.src = item[key];
                img.alt = 'Thumbnail Image';
                img.style.maxWidth = '100px';
                img.style.maxHeight = '100px';
                img.style.borderRadius = '5px';
                td.appendChild(img);
            } else {
                td.textContent = item[key];
            }
            row.appendChild(td);
        }

        const actionsTd = document.createElement('td');
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        const selectButton = document.createElement('button');
        selectButton.textContent = 'Select';
        selectButton.addEventListener('click', () => handleSelect(item));
        selectButton.className = 'btn btn-primary btn-sm';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => handleDelete(item, row));
        deleteButton.className = 'btn btn-danger btn-sm';

        buttonContainer.appendChild(selectButton);
        buttonContainer.appendChild(deleteButton);
        actionsTd.appendChild(buttonContainer);
        row.appendChild(actionsTd);

        tbody.appendChild(row);
        console.log("Item:", item); // Add this line
    });
}

function renderChart(data) {
    const ctx = DOM.chartCanvas.getContext('2d');
    const labels = data.map(item => item.title);
    const values = data.map(item => item.id);

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Data Values',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(192, 192, 192, 0.6)',
                    'rgba(0, 0, 255, 0.6)',
                    'rgba(0, 255, 0, 0.6)',
                    'rgba(255, 0, 0, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(192, 192, 192, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(0, 255, 0, 1)',
                    'rgba(255, 0, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Chart from API Data',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function showLoader() {
    DOM.loader.style.display = "flex";
}

function hideLoader() {
    DOM.loader.style.display = "none";
}

function displayErrorMessage(message) {
    const errorContainer = DOM.errorContainer;
    errorContainer.textContent = message;
    errorContainer.style.display = "block";
}

function hideErrorMessage() {
    DOM.errorContainer.style.display = "none";
    DOM.errorContainer.textContent = '';
}

function handleSelect(item) {
    console.log('Select:', item);
    const isFavorite = favorites.some(favItem => favItem.id === item.id);
    if (!isFavorite) {
        favorites.push(item);
        displayFavoriteItem(item);
        alert(`Added item: ${item.title} to favorites!`);
    }
    else {
        alert(`Item: ${item.title} is already in favorites!`);
    }
}

function handleDelete(item, rowElement) {
    console.log('Delete:', item);
    rowElement.remove();
    const indexToDelete = tableData.findIndex(dataItem => dataItem.id === item.id);
    if (indexToDelete !== -1) {
        tableData.splice(indexToDelete, 1);
    }
    renderChart(tableData);
    const indexInFavorites = favorites.findIndex(favItem => favItem.id === item.id);
    if (indexInFavorites !== -1) {
        favorites.splice(indexInFavorites, 1);
        updateFavoritesListUI();
    }
}

function displayFavoriteItem(item) {
    const li = document.createElement('li');
    li.textContent = item.title;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        removeFromFavorites(item.id);
        li.remove();
    });

    li.appendChild(removeButton);
    DOM.favoritesList.appendChild(li);
}

function removeFromFavorites(itemId) {
    const index = favorites.findIndex(item => item.id === itemId);
    if (index !== -1) {
        favorites.splice(index, 1);
        updateFavoritesListUI();
    }
}

function updateFavoritesListUI() {
    DOM.favoritesList.innerHTML = '';
    favorites.forEach(item => displayFavoriteItem(item));
}

fetchData();
