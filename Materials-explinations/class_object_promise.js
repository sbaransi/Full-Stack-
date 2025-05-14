// 1. Class

// A class is a blueprint for creating objects.It defines the properties(data) and methods(behavior) that objects of that class will have.

JavaScript

// Defining a class named 'Rectangle'
class Rectangle {
    // Constructor is a special method for creating and initializing objects
    constructor(height, width) {
        this.height = height; // 'this' refers to the instance being created
        this.width = width;
    }

    // Method to calculate the area
    getArea() {
        return this.height * this.width;
    }
}

// Class expressions (another way to define classes)
const Square = class {
    constructor(side) {
        this.side = side;
    }

    getArea() {
        return this.side * this.side;
    }
};

//******************************************************* */
// 2. Object (Instance of a Class)

// An object is a concrete instance of a class. You create objects using the new keyword followed by the class name and any arguments that the constructor requires.

// JavaScript

// Creating an object (instance) of the Rectangle class
const myRectangle = new Rectangle(10, 5);

// Creating an object (instance) of the Square class (using the class expression)
const mySquare = new Square(7);

// Accessing object properties
console.log(myRectangle.height); // Output: 10
console.log(mySquare.side);     // Output: 7

// Calling object methods
console.log(myRectangle.getArea()); // Output: 50
console.log(mySquare.getArea());    // Output: 49


const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 20 }
];
//********************************************************* */
// 3. Promise

// A Promise is an object representing the eventual completion(or failure) of an asynchronous operation and its resulting value.It helps manage asynchronous code in a more structured way, avoiding "callback hell."

// JavaScript

// Creating a new Promise
const myPromise = new Promise((resolve, reject) => {
    // Asynchronous operation (e.g., fetching data, timer)
    setTimeout(() => {
        const success = true; // Simulate success or failure
        if (success) {
            resolve("Data fetched successfully!"); // Call resolve with the result
        } else {
            reject("Failed to fetch data.");   // Call reject with the error
        }
    }, 2000); // Simulate a 2-second delay
});

// Handling the Promise's outcome using .then() and .catch()
myPromise
    .then((result) => {
        console.log("Success:", result); // Called if the Promise resolves
    })
    .catch((error) => {
        console.error("Error:", error);   // Called if the Promise rejects
    });

console.log("Promise initiated..."); // This will likely run before the Promise resolves or 