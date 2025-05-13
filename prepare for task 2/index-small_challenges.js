// 1. Arrow Functions:
// Challenge 1.1: Rewrite the following function expression using an arrow function:
const multiplyByTwo = (num) => num * 2; // Arrow function with implicit return
// Challenge 1.2: Write an arrow function called greet that takes a name as an argument and returns a greeting string like "Hello, [name]!".
const greet = (name) => `Hello, ${name}!`; // Arrow function using template literal
// Challenge 1.3: Given an array of numbers, use the map higher-order function along with an arrow function to create a new array where each number is squared.
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map(num => num * num); // map with arrow function to square each element
/**************************************************/
// 2. Class, Function Constructor:
// Challenge 2.1: Create a Car class with properties make, model, and year, and a method getDescription that returns a string like "This is a [year] [make] [model]".
class CarClass {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    getDescription() {
        return `This is a ${this.year} ${this.make} ${this.model}`;
    }
}
// Challenge 2.2: Rewrite the Car class from the previous challenge using a function constructor (function Car(make, model, year) { ... }) and its prototype to define the getDescription method.
function CarFunction(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}
CarFunction.prototype.getDescription = function () {
    return `This is a ${this.year} ${this.make} ${this.model}`;
};
// Challenge 2.3: Create two instances of the Car (one using the class syntax and one using the function constructor) and call their getDescription methods to verify they work.
const car1 = new CarClass('Toyota', 'Camry', 2020);
const car2 = new CarFunction('Honda', 'Civic', 2018);
// console.log(car1.getDescription());
// console.log(car2.getDescription());
/**************************************************/
// 3. Object Prototype, Keys, Values, Entries:
// Challenge 3.1: Create an object person with properties firstName, lastName, and age. Add a method getFullName to its prototype that returns the full name of the person.
const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30
};
person.__proto__.getFullName = function () { // Adding to the prototype
    return `${this.firstName} ${this.lastName}`;
};
// Challenge 3.2: Given the person object, write code to:
// Get an array of all its keys.
const keys = Object.keys(person); // Returns an array of the object's keys
// Get an array of all its values.
const values = Object.values(person); // Returns an array of the object's values
// Get an array of all its key-value pairs as [key, value] arrays.
const entries = Object.entries(person); // Returns an array of [key, value] pairs
// Challenge 3.3: Write a function that takes an object as input and returns a new object where the keys and values are swapped.
const swapKeysAndValues = (obj) => {
    const swapped = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            swapped[obj[key]] = key; // Swap key and value
        }
    }
    return swapped;
};
// console.log(swapKeysAndValues({ a: 1, b: 2, c: 3 }));
/**************************************************/
// 4. Array Prototype, isArray, from:
// Challenge 4.1: Write a function that checks if a given argument is an array using Array.isArray() and returns a boolean.
const isAnArray = (arg) => Array.isArray(arg); // Checks if the argument is an array
// Challenge 4.2: You have a string "12345". Use Array.from() to create a new array where each character of the string is an element in the array.
const stringToArray = Array.from("12345"); // Creates an array from an iterable object (string)
// Challenge 4.3: Write a function that takes an array-like object (e.g., arguments object from a regular function) and returns a true array containing its elements.
function convertToArrayLikeObject() {
    return Array.from(arguments); // Converts the arguments object to a real array
}
// console.log(convertToArrayLikeObject(1, 2, 3));
/**************************************************/
// 5. for of, in, forEach:
// Challenge 5.1: Given an array of colors, use a for...of loop to iterate through the array and print each color to the console.
const colors = ['red', 'green', 'blue'];
for (const color of colors) { // Iterates over the values of an iterable object (array)
    // console.log(color);
}
// Challenge 5.2: Given the person object from Challenge 3.1, use a for...in loop to iterate through its properties and print each key-value pair to the console.
for (const key in person) { // Iterates over the enumerable properties of an object
    if (person.hasOwnProperty(key)) {
        // console.log(`${key}: ${person[key]}`);
    }
}
// Challenge 5.3: Given an array of numbers, use the forEach method to calculate the sum of all the numbers.
const numbersForSum = [10, 20, 30];
let sum = 0;
numbersForSum.forEach(number => sum += number); // Executes a provided function once for each array element
// console.log(sum);
/**************************************************/
// 6. Higher Order Functions: map, filter, find, findIndex, indexOf:
const products = [
    { name: 'Laptop', price: 1200 },
    { name: 'Mouse', price: 25 },
    { name: 'Keyboard', price: 75 },
    { name: 'Monitor', price: 300 },
];
const numbersForFind = [11, 14, 21, 28, 35];
const strings = ['apple', 'banana', 'orange'];
// Challenge 6.1: Given an array of objects representing products with name and price properties, use map to create a new array containing only the names of the products.
const productNames = products.map(product => product.name); // Creates a new array by calling a function on each element
// Challenge 6.2: Given the same array of products, use filter to create a new array containing only the products with a price greater than a certain value (e.g., 50).
const expensiveProducts = products.filter(product => product.price > 50); // Creates a new array with elements that pass the test implemented by the provided function
// Challenge 6.3: Given an array of numbers, use find to find the first number that is divisible by 7.
const firstDivisibleBy7 = numbersForFind.find(number => number % 7 === 0); // Returns the value of the first element that passes the test
// Challenge 6.4: Given the same array of numbers, use findIndex to find the index of the first number that is divisible by 7.
const indexOfFirstDivisibleBy7 = numbersForFind.findIndex(number => number % 7 === 0); // Returns the index of the first element that passes the test
// Challenge 6.5: Given an array of strings, use indexOf to check if a specific string exists in the array and return its index if found, or -1 if not.
const indexOfBanana = strings.indexOf('banana'); // Returns the first index at which a given element can be found in the array, or -1 if it is not present
/**************************************************/
// 7. Callback:
// Challenge 7.1: Write a function doSomething that takes a number and a callback function as arguments. The doSomething function should perform an operation on the number (e.g., square it) and then call the callback function with the result.
const doSomething = (num, callback) => {
    const result = num * num;
    callback(result); // Call the callback function with the result
};
// Challenge 7.2: Create two callback functions: one that logs the result to the console and another that displays the result in an alert box. Call doSomething with different numbers and each of these callbacks.
const logResult = (result) => console.log(`The result is: ${result}`);
const alertResult = (result) => alert(`The result is: ${result}`);
// doSomething(5, logResult);
// doSomething(10, alertResult);
// Challenge 7.3: Simulate an asynchronous operation using setTimeout. Write a function getData that takes a callback. After a delay of 2 seconds, it should call the callback with some simulated data (e.g., an object or an array).
const getData = (callback) => {
    setTimeout(() => {
        const data = { message: 'Data fetched!' };
        callback(data); // Call the callback after the delay
    }, 2000);
};
// getData(data => console.log(data));
/**************************************************/
// 8. Promise (resolve, reject):
// Challenge 8.1: Create a Promise that resolves with the string "Data fetched successfully!" after a delay of 1 second.
const promiseResolved = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Data fetched successfully!"); // Resolve after 1 second
    }, 1000);
});
// promiseResolved.then(message => console.log(message));
// Challenge 8.2: Create a Promise that rejects with the error message "Failed to fetch data!" after a delay of 1.5 seconds.
const promiseRejected = new Promise((_, reject) => {
    setTimeout(() => {
        reject("Failed to fetch data!"); // Reject after 1.5 seconds
    }, 1500);
});
// promiseRejected.catch(error => console.error(error));
// Challenge 8.3: Write a function that returns a Promise. This Promise should simulate fetching data. If the simulated data is valid (e.g., not null), the Promise should resolve with the data. Otherwise, it should reject with an error message.
const fetchDataPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const simulatedData = { id: 1, value: 'Some data' };
            if (simulatedData) {
                resolve(simulatedData); // Resolve with data if valid
            } else {
                reject("Data is invalid!"); // Reject if data is invalid
            }
        }, 1200);
    });
};
// fetchDataPromise().then(data => console.log(data)).catch(error => console.error(error));
/**************************************************/
// 9. Async Await:
// Challenge 9.1: Rewrite the getData function from Challenge 7.3 to return a Promise. Then, write an async function that calls getData using await and logs the result to the console. Handle potential errors using a try...catch block.
const getDataPromise = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = { message: 'Data fetched with Promise!' };
            resolve(data);
        }, 2000);
    });
};
const fetchDataAsync = async () => {
    try {
        const result = await getDataPromise(); // Await the Promise to resolve
        console.log("Async data:", result);
    } catch (error) {
        console.error("Async error:", error);
    }
};
// fetchDataAsync();
// Challenge 9.2: Write an async function that fetches data from a public API (like the https://datausa.io/api/data?drilldowns=Nation&measures=Population you used before). Log the retrieved data to the console.
const fetchApiData = async () => {
    try {
        const response = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
        const data = await response.json(); // Parse the JSON response
        console.log("API data:", data);
    } catch (error) {
        console.error("API fetch error:", error);
    }
};
// fetchApiData();
// Challenge 9.3: Write an async function that calls two Promise-returning functions (simulating independent asynchronous tasks) using Promise.all() and await. Log the results of both tasks once they are complete.
const task1 = () => new Promise(resolve => setTimeout(() => resolve('Task 1 done!'), 1500));
const task2 = () => new Promise(resolve => setTimeout(() => resolve('Task 2 done!'), 1000));
const runTasks = async () => {
    try {
        const results = await Promise.all([task1(), task2()]); // Wait for both Promises to resolve
        console.log("Task results:", results);
    } catch (error) {
        console.error("Task error:", error);
    }
};
// runTasks();
/**************************************************/
// 10. try & catch & finally:
// Challenge 10.1: Write a function that attempts to parse a JSON string. Use a try...catch block to handle potential SyntaxError if the string is not valid JSON. Log an appropriate error message in the catch block.
const parseJsonSafely = (jsonString) => {
    try {
        const data = JSON.parse(jsonString); // Attempt to parse the JSON string
        console.log("Parsed data:", data);
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error("JSON parsing error:", error.message); // Log SyntaxError message
        } else {
            console.error("An unexpected error occurred:", error);
        }
    }
};
// parseJsonSafely('{"name": "Alice", "age": 25}');
// parseJsonSafely('{"name": "Bob", "age":'); // Invalid JSON
// Challenge 10.2: Extend the previous function with a finally block that logs a message "Parsing attempt completed" regardless of whether the parsing was successful or not.
const parseJsonWithFinally = (jsonString) => {
    try {
        const data = JSON.parse(jsonString);
        console.log("Parsed data:", data);
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error("JSON parsing error:", error.message);
        } else {
            console.error("An unexpected error occurred:", error);
        }
    } finally {
        console.log("Parsing attempt completed"); // This will always execute
    }
};
// parseJsonWithFinally('{"city": "New York"}');
// parseJsonWithFinally('{ "country": "USA"');
// Challenge 10.3: Write a function that simulates a resource being opened and closed (e.g., a file). Use a try...catch...finally block. In the try block, simulate opening the resource (log a message). In the catch block, log an error if opening fails (you can simulate this by throwing an error). In the finally block, simulate closing the resource (log a message), ensuring it runs even if an error occurred.
const manageResource = (shouldFailOpen) => {
    let resourceOpened = false;
    try {
        console.log("Attempting to open resource...");
        if (shouldFailOpen) {
            throw new Error("Failed to open resource!"); // Simulate opening failure
        }
        console.log("Resource opened successfully.");
        resourceOpened = true;
        // Simulate using the resource
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        if (resourceOpened) {
            console.log("Resource closed.");
        } else {
            console.log("Attempted to close resource (may not have opened).");
        }
    }
};
// manageResource(false); // Successful open and close
// manageResource(true);  // Failed open, attempted close
/**************************************************/
// 11. Complexity:
// Challenge 11.1: Analyze the time complexity (Big O notation) of the following code snippet:
function sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) { // This loop runs 'n' times, where 'n' is the length of the array
        sum += arr[i]; // Constant time operation
    }
    return sum;
}
// Time Complexity: O(n) - Linear time complexity because the execution time grows linearly with the size of the input array.
// Challenge 11.2: Analyze the time complexity of the following code snippet:
function nestedLoop(arr) {
    for (let i = 0; i < arr.length; i++) { // Outer loop runs 'n' times
        for (let j = 0; j < arr.length; j++) { // Inner loop also runs 'n' times for each iteration of the outer loop
            // console.log(arr[i] * arr[j]); // Constant time operation
        }
    }
}
// Time Complexity: O(n^2) - Quadratic time complexity because the execution time grows proportionally to the square of the input array size due to the nested loops.
// Challenge 11.3: Explain in your own words the difference
// 11. Complexity (Continued):

// Challenge 11.3: Explain in your own words the difference between O(1) and O(n) time complexity. Provide a simple code example for each.
// O(1) (Constant Time): The execution time of the function remains the same regardless of the input size.
const getItemAtIndex = (arr, index) => arr[index]; // Accessing an element by index takes constant time.
// Example:
const myArrayO1 = [1, 2, 3, 4, 5];
// console.log(getItemAtIndex(myArrayO1, 2)); // This operation takes the same amount of time regardless of the size of myArrayO1.

// O(n) (Linear Time): The execution time of the function grows linearly with the size of the input.
const findItem = (arr, target) => {
    for (let i = 0; i < arr.length; i++) { // The loop runs at most 'n' times.
        if (arr[i] === target) {
            return true;
        }
    }
    return false;
};
// Example:
const myArrayOn = [10, 20, 30, 40, 50];
// console.log(findItem(myArrayOn, 30)); // In the worst case, we might have to iterate through the entire array.
// console.log(findItem(myArrayOn, 60));

/**************************************************/
// 12. Object (Insert, Delete, Get - O(1)):

// Challenge 12.1: Create an empty JavaScript object. Write code to insert a new key-value pair into the object.
const myObject = {}; // Create an empty object
myObject.name = 'Alice'; // Insert a new key-value pair
myObject['age'] = 30; // Another way to insert a key-value pair

// Challenge 12.2: Given the object from the previous challenge, write code to delete a specific key-value pair from it.
delete myObject.age; // Delete the 'age' property

// Challenge 12.3: Given the object, write code to access the value associated with a specific key.
const nameValue = myObject.name; // Access the value associated with the 'name' key
// console.log(nameValue);

// Challenge 12.4: Explain why, on average, inserting, deleting, and getting properties in a JavaScript object have a time complexity of O(1).
// Explanation: JavaScript objects are typically implemented using hash tables (or similar data structures). Hash functions allow for direct access to the memory location of a key-value pair based on the key.
// Inserting: The hash function calculates the memory address, and the key-value pair is placed there.
// Deleting: The hash function finds the address, and the entry is removed.
// Getting: The hash function finds the address, and the value is retrieved directly.
// These operations, on average, take a constant amount of time, regardless of the size of the object, hence O(1). In the worst-case scenario (hash collisions), the complexity can degrade, but on average, it remains constant.

/**************************************************/
// 13. Array (Insert, Delete, Search - O(1) Insert/Delete at End, O(n) Search):

const myArrayForArrayOps = [1, 2, 3, 4, 5];

// Challenge 13.1: Create an array of numbers. Write code to insert a new number at the end of the array.
myArrayForArrayOps.push(6); // Adding to the end is generally O(1)

// Challenge 13.2: Given the array, write code to delete the last element from the array.
myArrayForArrayOps.pop(); // Removing from the end is generally O(1)

// Challenge 13.3: Write a function that takes an array and a target value as input and searches for the target value in the array. Return true if found, false otherwise. Analyze the time complexity of this search.
const searchArray = (arr, target) => {
    for (let i = 0; i < arr.length; i++) { // In the worst case, we iterate through the entire array.
        if (arr[i] === target) {
            return true;
        }
    }
    return false;
};
// Time Complexity: O(n) - Linear time complexity because, in the worst-case scenario, we might have to examine every element in the array to find the target value.

// Challenge 13.4: Explain why inserting or deleting elements at the end of an array typically has a time complexity of O(1), while searching for an element has a time complexity of O(n).
// Explanation:
// Insert/Delete at End (O(1)): When adding or removing elements from the end of an array (using push() or pop() in JavaScript), the JavaScript engine usually has direct access to the last element. It simply adds or removes the element without needing to shift other elements. This takes a constant amount of time.
// Search (O(n)): To search for an element in an unsorted array, we typically need to iterate through the array element by element until we find the target or reach the end. In the worst case, the target element is the last element or not present at all, requiring us to examine all 'n' elements of the array. Therefore, the time complexity is linear, O(n), as the time taken increases proportionally to the size of the array.