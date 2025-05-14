// Assuming the following HTML structure:
// <div id="myDiv">Hello <span>World</span></div>
// <input type="text" id="myInput" value="Initial Value">
// <select id="mySelect">
//   <option value="option1">Option 1</option>
//   <option value="option2" selected>Option 2</option>
// </select>
// <a id="myLink" href="https://example.com" target="_blank">Link</a>
// <img id="myImage" src="old.jpg" alt="Old Image">
// <div id="classDiv" class="box shadow"></div>
// <input type="checkbox" id="myCheckbox" checked>
// <div id="styleDiv" style="color: red; background-color: lightgray;">Text</div>

const divElement = document.getElementById('myDiv');
const inputElement = document.getElementById('myInput');
const selectElement = document.getElementById('mySelect');
const linkElement = document.getElementById('myLink');
const imageElement = document.getElementById('myImage');
const classDivElement = document.getElementById('classDiv');
const checkboxElement = document.getElementById('myCheckbox');
const styleDivElement = document.getElementById('styleDiv');

// Getting data:

// innerHTML
const divContentHTML = divElement.innerHTML; // "Hello <span>World</span>"

// textContent
const divContentText = divElement.textContent; // "Hello World"

// innerText
const divContentRenderedText = divElement.innerText; // "Hello World" (as rendered)

// value (input)
const inputValue = inputElement.value; // "Initial Value"

// value (select)
const selectValue = selectElement.value; // "option2"

// getAttribute('href')
const linkHref = linkElement.getAttribute('href'); // "https://example.com"

// getAttribute('target')
const linkTarget = linkElement.getAttribute('target'); // "_blank"

// Direct property access (id)
const divId = divElement.id; // "myDiv"

// Direct property access (className)
const divClass = classDivElement.className; // "box shadow"

// Direct property access (href)
const linkHrefProp = linkElement.href; // "https://example.com/" (can be the full URL)

// Direct property access (checked)
const isChecked = checkboxElement.checked; // true

// className
const classDivClassName = classDivElement.className; // "box shadow"

// classList (as array-like object)
const classListItems = classDivElement.classList; // DOMTokenList ['box', 'shadow']

// style (as CSSStyleDeclaration object)
const styleObject = styleDivElement.style; // CSSStyleDeclaration {0: "color", 1: "background-color", ...}
const textColor = styleDivElement.style.color; // "red"
const backgroundColor = styleDivElement.style.backgroundColor; // "lightgray"