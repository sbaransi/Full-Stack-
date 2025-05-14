// Using splice()

productList.addEventListener('click', (event) => {
    const id = event.target.dataset.id;
    if (event.target.classList.contains('delete')) {
        // Find the index of the product to delete
        const indexToDelete = products.findIndex(product => product.id === id);

        if (indexToDelete !== -1) { // Check if the product was found
            products.splice(indexToDelete, 1); // Remove the product
            saveToLocalStorage();
            renderProducts();
        }
    }
});

// findIndex with splice

productList.addEventListener('click', (event) => {
    const id = event.target.dataset.id;
    if (event.target.classList.contains('delete')) {
        const indexToDelete = products.findIndex(product => product.id === id);

        if (indexToDelete !== -1) {
            products.splice(indexToDelete, 1);
            saveToLocalStorage();
            renderProducts();
        }
    }
});

// ****************************************************
//using filter()
productList.addEventListener('click', (event) => {
    const id = event.target.dataset.id;
    if (event.target.classList.contains('delete')) {
        products = products.filter(product => product.id !== id);
        saveToLocalStorage();
        renderProducts();
    }
});

// ****************************************************
// Using forEach() (Manual Removal)

productList.addEventListener('click', (event) => {
    const id = event.target.dataset.id;
    if (event.target.classList.contains('delete')) {
        let newProducts = []; // Create a new array to store the remaining products

        products.forEach(product => {
            if (product.id !== id) {
                newProducts.push(product); // Add products that don't match the ID
            }
        });

        products = newProducts; // Replace the original array with the new one
        saveToLocalStorage();
        renderProducts();
    }
});


// ****************************************************
// find with forEach (Manual Removal)

productList.addEventListener('click', (event) => {
    const id = event.target.dataset.id;
    if (event.target.classList.contains('delete')) {
        const productToDelete = products.find(product => product.id === id);

        if (productToDelete) {
            let newProducts = [];
            products.forEach(product => {
                if (product !== productToDelete) { // Check for reference equality
                    newProducts.push(product);
                }
            });
            products = newProducts;
            saveToLocalStorage();
            renderProducts();
        }
    }
});

// ****************************************************
// map() to Create a New Array of Product Names

const productNames = products.map(product => product.name);
console.log(productNames); // Output: ["Laptop", "Phone", "Tablet"]

// Example of map used to create html elements.
const productListElement = document.getElementById('product-list');
const productHtml = products.map(product => `<div>${product.name} - $${product.price}</div>`).join('');
if(productListElement){
    productListElement.innerHTML = productHtml;
}

// ****************************************************
// reduce() to Calculate the Total Price of All Products

const totalPrice = products.reduce((accumulator, product) => accumulator + product.price, 0);
console.log(totalPrice); // Output: 2500


// ****************************************************
// sort() to Sort Products by Price (Ascending)

const sortedProducts = [...products].sort((a, b) => a.price - b.price); // Create copy to avoid modifying original
console.log(sortedProducts);
/* Output:
[
  { id: 3, name: 'Tablet', price: 500 },
  { id: 2, name: 'Phone', price: 800 },
  { id: 1, name: 'Laptop', price: 1200 }
]
*/

// ****************************************************

// every() to Check if All Products Have a Price Over 400

const allOver400 = products.every(product => product.price > 400);
console.log(allOver400); // Output: true


// **********************************************************
// some() to Check if Any Product Has a Price Over 1000

const anyOver1000 = products.some(product => product.price > 1000);
console.log(anyOver1000); // Output: true

// **********************************************************
const Variable	Function	    Data Type
productNames	map()	        Array of strings
totalPrice	    reduce()	    Number
sortedProducts	sort()	        Array of objects
allOver400	    every()	        Boolean
anyOver1000	    some()	        Boolean
productHtml	    map() + join()	string




// **********************************************************
// Class and constructor 
// data.js (Your Existing Data File):

// data.js
export const productData = [
    { name: 'Laptop', price: 1200, category: 'electronics', image: 'laptop.jpg' },
    { name: 'T-Shirt', price: 25, category: 'clothing', image: 'tshirt.jpg' },
    { name: 'JavaScript Book', price: 30, category: 'books', image: 'jsbook.jpg' },
    { name: 'Smartphone', price: 800, category: 'electronics', image: 'phone.jpg' },
    { name: 'Jeans', price: 50, category: 'clothing', image: 'jeans.jpg' },
    { name: 'Python Book', price: 35, category: 'books', image: 'pybook.jpg' },
    // ... your other product data ...
];
// 2. script.js (Modified to Use data.js):


// script.js
import { productData } from './data.js';

// Define the Product class
class Product {
    constructor(name, price, category, image) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.image = image;
    }
}

// Instantiate Product objects from the imported data
const products = productData.map(data => new Product(data.name, data.price, data.category, data.image));


<script src="script.js" type="module"></script>