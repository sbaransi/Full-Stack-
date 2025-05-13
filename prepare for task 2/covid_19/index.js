
const API_URL = 'https://api.covid19api.com/summary';

const DOM = {
    globalNewConfirmed: document.getElementById('global-new-confirmed'),
    globalTotalConfirmed: document.getElementById('global-total-confirmed'),
    globalNewDeaths: document.getElementById('global-new-deaths'),
    globalTotalDeaths: document.getElementById('global-total-deaths'),
    globalNewRecovered: document.getElementById('global-new-recovered'),
    globalTotalRecovered: document.getElementById('global-total-recovered'),
    countryDataTable: document.getElementById('country-data-table'),
    topCasesChartCanvas: document.getElementById('top-cases-chart'),
    loader: document.getElementById('loader'),
    errorContainer: document.getElementById('error-container'),
    globalDataCard: document.getElementById('global-data-card'),
    countryDataTableContainer: document.getElementById('country-data-table-container'),
    chartContainer: document.getElementById('chart-container')
};

let topCasesChartInstance = null; // Store the chart instance

function fetchData() {
    showLoader();
    hideErrorMessage();
    removeLoadingPlaceholders();
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
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
    updateGlobalData(data.Global);
    updateCountryDataTable(data.Countries);
    renderTopCasesChart(data.Countries);
}

function updateGlobalData(data) {
    DOM.globalNewConfirmed.textContent = data.NewConfirmed.toLocaleString();
    DOM.globalTotalConfirmed.textContent = data.TotalConfirmed.toLocaleString();
    DOM.globalNewDeaths.textContent = data.NewDeaths.toLocaleString();
    DOM.globalTotalDeaths.textContent = data.TotalDeaths.toLocaleString();
    DOM.globalNewRecovered.textContent = data.NewRecovered.toLocaleString();
    DOM.globalTotalRecovered.textContent = data.TotalRecovered.toLocaleString();

    DOM.globalDataCard.classList.remove('sk-loading');
}

function updateCountryDataTable(data) {
    const tableBody = DOM.countryDataTable.querySelector('tbody');
    tableBody.innerHTML = '';
    data.forEach(country => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${country.Country}</td>
                <td>${country.NewConfirmed.toLocaleString()}</td>
                <td>${country.TotalConfirmed.toLocaleString()}</td>
                <td>${country.NewDeaths.toLocaleString()}</td>
                <td>${country.TotalDeaths.toLocaleString()}</td>
                <td>${country.NewRecovered.toLocaleString()}</td>
                <td>${country.TotalRecovered.toLocaleString()}</td>
                <td>${new Date(country.Date).toLocaleDateString()}</td>
            `;
        tableBody.appendChild(row);
    });
    DOM.countryDataTable.classList.remove('sk-loading');
}

function renderTopCasesChart(data) {
    const sortedData = [...data].sort((a, b) => b.NewConfirmed - a.NewConfirmed).slice(0, 10);
    const ctx = DOM.topCasesChartCanvas.getContext('2d');

    if (topCasesChartInstance) {
        topCasesChartInstance.destroy();
    }

    topCasesChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedData.map(country => country.Country),
            datasets: [{
                label: 'New Confirmed Cases',
                data: sortedData.map(country => country.NewConfirmed),
                backgroundColor: '#8884d8',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Top 10 Countries by New Confirmed Cases',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    DOM.chartContainer.classList.remove('sk-loading');
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
function removeLoadingPlaceholders() {
    DOM.globalDataCard.classList.remove('sk-loading');
    DOM.countryDataTableContainer.classList.remove('sk-loading');
    DOM.chartContainer.classList.remove('sk-loading');

    // Remove skeleton from global card
    DOM.globalNewConfirmed.classList.remove('sk-loading');
    DOM.globalTotalConfirmed.classList.remove('sk-loading');
    DOM.globalNewDeaths.classList.remove('sk-loading');
    DOM.globalTotalDeaths.classList.remove('sk-loading');
    DOM.globalNewRecovered.classList.remove('sk-loading');
    DOM.globalTotalRecovered.classList.remove('sk-loading');

    //remove skeleton from table
    const tableBody = DOM.countryDataTable.querySelector('tbody');
    tableBody.innerHTML = ` <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                     <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>`; //clear the skeleton rows

}

fetchData();
