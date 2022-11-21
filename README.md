# Pokedex

First app built with programing and functionality

## Project description

Goal was to create a Pokedex web application using HTML, CSS, and JavaScript. Application **must** load data from an external API and allow users to _interact_ and view data points in detail. 

## How to get the project running

To start the application open the **index.html** file in the repository.

Go to: https://brett-ranieri.github.io/first-js-app/

## API used

PokeAPI - https://pokeapi.co/api/v2/pokemon/?limit=150

## Project Dependencies

**ES6**  
**Promise Polyfill**  
**Fetch Polyfill**  
**jquery-3.3.1.slim.min.js**  
**BOOTSTRAP**  
**PokeAPI** 
  
*Linters used in VSCode:   
ESLint  
HTMLHint  
Stylellint*    

## Tools and Functionality:

**Modal:**  
Will open for individual pokemon on the 'click' of the "View Details" button.   
Modal can also be opened through seach tool by clicking on the pokemon's button populated in the drop down.    
  
<ins>To Close:</ins>  
Click "X"  
Click "Close" Button  
Click inside modal container  
Press "Escape" key  
  
**Search:**  
Will return a list of clickable buttons for any pokemon matching search input.  
*Does **NOT** require full pokemon name, will return partial matches*  
*Will return an error message in drop down if no pokemon match search/if nothing is entered*  
Each button will open the modal for that specific pokemon if clicked. This simultaneously closes drop down and clears input field.  
  
<ins>To Clear Input field:</ins>   
Click "X"   
Press "Escape" key  
Click pokemon button to open a modal  
  
<ins>To Close:</ins>  
Click pokemon button to open a modal   
Click "Close" Button   
Press "Escape" key

