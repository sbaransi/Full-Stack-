DOM = {
    countriesSelect: null,
    getSelectedCountries: null,
    countryDetailsContent: null,

}

function init() {
    DOM.countriesSelect = document.getElementById("countriesSelect")
    DOM.getSelectedCountries = document.getElementById("getSelectedCountries")
    DOM.countryDetailsContent = document.getElementById("countryDetailsContent")

    DOM.countriesSelect.addEventListener("click", async function () {
    const codes = Array.from(DOM.countriesSelect.selectedOptions).map(optionHTML=> optionHTML.value)
    const promises= codes.map(code=> getCountryByCode(code))
    const results = await Promise.all(promises)
    results.forEach(result => drawCountryDetails(result))
    })

    loadCountiresSelect();

}


async function loadCountiresSelect() {

    try {
        const results = await getcountriesApi();
        showCountriesSelect(results)
    }
    catch (error) {
        alert(error)
    }
    finally {
        console.log("sucessful load")
    }

}

async function getcountriesApi() {
    const result = await fetch(`https://restcountries.com/v3.1/all`)
    const data = await result.json();
    console.log(data)
    return data

}

function showCountriesSelect(data) {

    if (!Array.isArray(data)) return;

    data.forEach(country => {

        const optionElement = `<option value="${country.caa3}"> ${country.name.common}</option>`
        DOM.countriesSelect.innerHTML += optionElement;
    })
}



async function getCountryByCode(code){

    const country= await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
    const data= await country.json();
    const [firstCountry]=data;

    const svgflag = await fetch(firstCountry.flag.svg)
    const svgText = await svgflag.text()
return {
    name: firstCountry?.name?.official,
    flag: firstCountry?.flags?.svg,
    svgText
}
}

function drawCountryDetails(country) {
const content = document.getElementById("countryDetailsContent")
content.innerHTML += `<div>  
<h1> ${country.name} </h1>
<img src=${country.flag} height=200 width=200    />
</div> 
${country.svgText}
`

}
init();


gfdsgfdg