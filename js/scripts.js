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
        let listItem = document.createElement('li');

        let masterList = document.querySelector('.pokemon-list');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('listItem');
        addPokemonEventListener(button, pokemon);

        listItem.appendChild(button);
        masterList.appendChild(listItem);
    }
    
    function addPokemonEventListener(element, pokemon) {
        element.addEventListener('click', function() {
          showDetails(pokemon);  
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    function getAll() {
        return dataSet;
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList
    }
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
