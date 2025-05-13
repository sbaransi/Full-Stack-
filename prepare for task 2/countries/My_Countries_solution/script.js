
async function fetchChartData() {
    const result = await fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
    const chartData = await result.json()
    console.log(chartData)
    return chartData
}

async function fetchCardData() {
    const result = await fetch("https://datausa.io/api/searchLegacy/?limit=10&dimension=University&hierarchy=University&q=")
    const cardData = await result.json()
    console.log(cardData)
    return cardData
}

async function init() {

    try {
        const result = await Promise.all([fetchChartData(), fetchCardData()])
        populationArray = result[0];
        universityArray = result[1];
        drawChart(populationArray)
        drawCards(universityArray)

        console.log(populationArray)
        console.log(universityArray)

    }
    catch (error) {
        console.log("something went wrong")
    }
}
init();

function drawChart(data) {
    const years = data.data.map(item => item.Year)
    const populations = data.data.map(item => item.Population)

    new Chart("myChart", {
        type: "bar",
        data: {
            labels: years,
            datasets: [{
                // backgroundColor: barColors,
                data: populations
            }]
        },
        // options: { ...}
    });
}


function drawCards(data) {
    const cardcontainer = document.getElementById("cards")
    cardcontainer.innerHTML = '';

    data.results.forEach(university => {
        const card = document.createElement('div');
        card.classList.add('university-card')

        // const imgElemnet = document.createElement('img');
        // imgElement.src = university.name;

        const nameElment = document.createElement('h3')
        nameElment.textContent = university.name;

        const idElement = document.createElement('p')
        idElement.textContent = `ID: ${university.id}`;

        const scoreElement = document.createElement('p')
        scoreElement.textContent = `Score: ${university.zvalue}`

        // card.appendChild(imgElement)
        card.appendChild(nameElment)
        card.appendChild(idElement)
        card.appendChild(scoreElement)

        cardcontainer.appendChild(card)
    });

}

