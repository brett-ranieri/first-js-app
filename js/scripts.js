let pokemonRepository = (function() {
    let dataSet = []; 
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (typeof pokemon === 'object') {
            //checks for inclusion of specific keys
            if (
                Object.keys(pokemon).includes('name') 
                // ****Had to comment out to allow pokemon to meet requirements for push**** &&
                //Object.keys(pokemon).includes('type') &&
                //Object.keys(pokemon).includes('height')
            ) {
                dataSet.push(pokemon);
            } else {
                console.log('"Name", "Type", and "Height are required to add a new pokemon to the Pokedex');
            }
            
        } else {
            console.log('You can only add Objects to the list.');
        }
        
    }

    function addListItem(pokemon) {
        
        let listItem = document.createElement('li'); //creates li
        
        let masterList = document.querySelector('.pokemon-list'); //targets location for newly created elements
        
        let button = document.createElement('button'); //creates buttons
        button.innerText = pokemon.name; //names button
        button.classList.add('listItem'); //assigs class to button
        addPokemonEventListener(button, pokemon); //assigns click for details to each button
        listItem.appendChild(button); //adds newly created button as li
        masterList.appendChild(listItem); //specifies that li should be included in HTML ul
    }
    
    function addPokemonEventListener(element, pokemon) {
        element.addEventListener('click', function() {
          showDetails(pokemon);  
        }); //executes showDetails when a button is clicked
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        }); 
    }

    function getAll() {
        return dataSet;
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            showLoadingMessage();
            // testing functionality of loading message functions
            console.log(loadingMessage.classList.contains('loading'));
            return response.json(); //parses the response body into JSON data
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                }; //creates Javascript objects and assigns keys
                add(pokemon); //calls add function
                hideLoadingMessage(); 
                // testing functionality of loading message functions
                console.log(loadingMessage.classList.contains('loading'));
            });
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            showLoadingMessage();
            // testing functionality of loading message functions
            console.log(loadingMessage.classList.contains('loading'));
            return response.json(); //parses the response body into JSON data
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            hideLoadingMessage();
            // testing functionality of loading message functions
            console.log(loadingMessage.classList.contains('loading'));
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
        });
    }

    let loadingMessage = document.querySelector('#loading-message');

    function showLoadingMessage() {
        loadingMessage.classList.add('loading');
    }

    function hideLoadingMessage() {
        loadingMessage.classList.remove('loading');
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();
//End of IIFE

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});












//////// Filter Function Below - to be added with Search Input later //////////////

//let pokemonList = pokemonRepository.getAll();

//let query = prompt('Enter name of the Pokemon you seek', 'Enter name here');
//update this query using classList and selected (exercise 1.6)
//pair this with a CSS rule display:none to onlyshow pokemon that include query 

//const filteredPokemon = pokemonList.filter(x => x.name.toLowerCase().includes(query.toLowerCase()));

//console.log(filteredPokemon);
