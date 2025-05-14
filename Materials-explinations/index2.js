calculateArea = (length, width) => {
    return length * width
}

isEven = (number) => {

    if (number % 2 == 0)
        return true

    else return false
}


const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 20 }
];

const ages = users.map(user => user.age)
console.log(ages)


class Rectangle {
    constructor(height, width) {
        this.height = height
        this.width = width
    }

    getArea() {
        return this.height * this.width
    }
}


function RectangleFunction(height, width) {
    this.height = height
    this.width = width


    RectangleFunction.prototype.getArea = function () {
        return this.height * this.width;
    }
}

const myRectangle = new Rectangle(10, 5)
const myRectangleFunction = new RectangleFunction(10, 5)

// const Dog = {
//     name: null,
//     breed: null,
//     age: null,
//     bark() {
//         console.log("woof")
//     }
// }


class Dog {
    constructor(name, breed, age) {
        this.name = name,
            this.breed = breed,
            this.age = age
    }
    bark() {
        console.log("woof")
    }
}
const myDog = new Dog("buddy", "Golden", 3)

const keys = Object.keys(myDog)
const values = Object.values(myDog)
const entries = Object.entries(myDog)

function getValueByKey(obj, key) {

    return obj[key]

}

getValueByKey(myDog, "breed")


function checkIfArray(arr) {

    if (Array.isArray(arr))
        return true
    else
        return false
}

const digits = "0123456789"
const Array = Array.from(digits)


function sammy(obj) {
    const array = []
    array = Array.from(obj)
}

sammy(1, "sammy", true)

const fruits = ['apple', 'banana', 'orange'];
for (const element of fruits) {
    console.log(element)

}

class Dog {
    constructor(name, breed, age) {
        this.name = name,
            this.breed = breed,
            this.age = age
    }
    bark() {
        console.log("woof")
    }
}
const myDog = new Dog("buddy", "Golden", 3)

for (const key in myDog) {
    if (Object.prototype.hasOwnProperty.call(myDog, key)) {
        const element = myDog[key];
        console.log(`${key} : ${element}`)

    }
}

const array = [12.99, 5.50, 20.00];

array.forEach(element => {
    sum += element
});


const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 20 }
];

const ages = users.map(user => user.name.toUpperCase())
console.log(ages)

const products = [
    { name: 'Laptop', price: 1200, inStock: true },
    { name: 'Mouse', price: 25, inStock: false },
    { name: 'Keyboard', price: 75, inStock: true },
    { name: 'Monitor', price: 300, inStock: true }
];

const inStock = products.filter(product => products.inStock)

const numbersForFind = [15, 22, 7, 31, 14];


const higher = numbersForFind.findIndex(number => number % 7 === 0)

const colorsToCheck = ['red', 'blue', 'green', 'yellow'];

const colorr = colorsToCheck.findIndex('green')

function init() {
    DOM.selectCountry = document.getElementById("countriesSelect");
    DOM.loader = document.getElementById("loader");
    DOM.button = document.getElementById("getSelectedCountries");
    DOM.buttonWithFailure = document.getElementById("buttonWithFailure");

    DOM.button.addEventListener("click", async function () {
        const codes = Array.from(DOM.selectCountry.selectedOptions).map(optionHTML => optionHTML.value);
        const promises = codes.map(code => getCountryByCode(code));
        const results = await Promise.all(promises);
        results.forEach(country => drawCountryDetails(country));
    });

    DOM.buttonWithFailure.addEventListener("click", async function () {
        const codes = [...Array.from(DOM.selectCountry.selectedOptions).map(optionHTML => optionHTML.value), "NOT_EXISTING_COUNTRY"];
        const promises = codes.map(code => getCountryByCode(code));
        const results = await Promise.allSettled(promises);
        console.log(results);
        const onlySucceededCountries = results.filter(item => item.status === "fulfilled").map(item => item.value);
        onlySucceededCountries.forEach(country => drawCountryDetails(country));
    });

    // DOM.selectCountry.addEventListener("change", async function () {
    //   try {
    //     showLoader();
    //     const c = await getCountryByCode(this.value);
    //     if (c) {
    //       drawCountryDetails(c);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     hideLoader();
    //   }
    // });
    showCountriesNames();
}























