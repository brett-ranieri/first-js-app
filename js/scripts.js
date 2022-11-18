//************Start of Pokemon Repository IIFE*******************

let pokemonRepository = (function() {
    let dataSet = []; 
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (typeof pokemon === 'object') {
            //checks for inclusion of specific keys
            if (
                Object.keys(pokemon).includes('name') 
            ) {
                dataSet.push(pokemon);
            } else {
                alert('"Name" is required to add a new pokemon to the Pokedex');
            }
        } else {
            alert('You can only add Objects to the list.');
        }
    }

    function addListItem(pokemon) {
        let listItem = document.createElement('li'); //creates li
        listItem.classList.add('group-list-item'); // need to add this class to li's for bootstrap
        listItem.classList.add('col-sm-12'); //sets li size based on breakpoints
        listItem.classList.add('col-md-6');
        listItem.classList.add('col-lg-3');

        let masterList = document.querySelector('.pokemon-list'); //targets location for newly created elements
        
        let button = document.createElement('button'); //creates buttons
        button.innerText = pokemon.name.toUpperCase(); //names button
        button.classList.add('list-item'); //assigs class to button
        button.classList.add('group-list-item'); // need to add this class to li's for bootstrap
        button.classList.add('col-sm-12'); //sets button size based on breakpoints
        button.setAttribute('data-toggle', 'modal'); //BOOTSTRAP: tells button to toggle the modal
        button.setAttribute('data-target', '#modal-container'); //BOOTSTRAP: specifies the target element that will be changed
        addPokemonEventListener(button, pokemon); //assigns click for details to each button
        listItem.appendChild(button); //adds newly created button as li
        masterList.appendChild(listItem); //specifies that li should be included in HTML ul
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            showLoadingMessage();
            return response.json(); //parses the response body into JSON data
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                }; //creates Javascript objects and assigns keys
                add(pokemon); //calls add function
                hideLoadingMessage();
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
            return response.json(); //parses the response body into JSON data
        }).then(function(details) { //believe this is how you talk to API to pull specific data and assign it to a key
            item.imageUrl = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types.map((type) => type.type.name).join(', '); //needed to update to show text of types - basic understanding of what is happening here...
            hideLoadingMessage();
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
        });
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(pokemon);
        }); 
    }

    function addPokemonEventListener(element, pokemon) {
        element.addEventListener('click', function() {
          showDetails(pokemon);  
        }); //executes showDetails when a button is clicked
    }

//***********************START - BootStrap Modal***********************************

    function showModal(pokemon){
        let modalBody = document.querySelector('.modal-body');
        let modalTitle = document.querySelector('.modal-title');

        modalTitle.innerText = '';
        modalBody.innerText = '';

        let pokemonName = document.createElement('h1');
        pokemonName.innerText = pokemon.name.toUpperCase();

        let pokemonImgFront = document.createElement('img');
        pokemonImgFront.classList.add('pokemon-image', 'modal-img');
        pokemonImgFront.alt = 'Image of front of ' + pokemon.name;
        pokemonImgFront.src = pokemon.imageUrl;

        let pokemonImgBack = document.createElement('img');
        pokemonImgBack.classList.add('pokemon-image', 'modal-img');
        pokemonImgBack.alt = 'Image of back of ' + pokemon.name;
        pokemonImgBack.src = pokemon.imageUrlBack;

        let pokemonType = document.createElement('p');
        pokemonType.innerText = 'Type: ' + pokemon.types;

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = 'Height: ' + pokemon.height;

        let pokemonWeight = document.createElement('p');
        pokemonWeight.innerText = 'Weight: ' + pokemon.weight;

        modalTitle.appendChild(pokemonName);
        modalBody.appendChild(pokemonImgFront);
        modalBody.appendChild(pokemonImgBack);
        modalBody.appendChild(pokemonType);
        modalBody.appendChild(pokemonHeight);
        modalBody.appendChild(pokemonWeight);
    }

//***************************END - BootStrap Modal*************************************

//*******************START - Loading Message****************************************
    
    let loadingMessage = document.querySelector('#loading-message');

    function showLoadingMessage() {
        loadingMessage.classList.add('loading');
    }

    function hideLoadingMessage() {
        loadingMessage.classList.remove('loading');
    }

//********************END - Loading Message******************************************  
//********************START Nav-Bar Search Function***********************************

function navBarSearch (e) {
    e.preventDefault()
    
    let searchField = document.getElementById('nav-search');
    let dropDown = document.getElementById('dropdown-list');
    let dropDownModal = document.getElementById('result-dropdown');
    

    let pokemonList = pokemonRepository.getAll();
    let input = searchField.value.toLowerCase();
    const filteredPokemon = pokemonList.filter(x => x.name.toLowerCase().includes(input));
    console.log(filteredPokemon.length);
    dropDown.innerText = filteredPokemon.length ? '': null;
    filteredPokemon.forEach(addToDropdown);

    function addSearchResultEventListener(element, pokemon) {
          element.addEventListener('click', function(e) {
             e.preventDefault();
             showDetails(pokemon);  
             document.getElementById('result-dropdown').classList.remove('dropdown-show');
             searchField.value = '';
            });
      }  

    function addToDropdown(pokemon) {
        if (filteredPokemon.length > 0) {
            console.log('im hit');
        let searchItem = document.createElement('li');
        searchItem.classList.add('group-list-item');
        searchItem.classList.add('col-12');  

        let searchButton = document.createElement('button');
        searchButton.innerText = pokemon.name.toUpperCase();
        searchButton.classList.add('search-list-item');
        searchButton.classList.add('group-list-item');
        searchButton.classList.add('col-12');
        searchButton.setAttribute('data-toggle', 'modal');
        searchButton.setAttribute('data-target', '#modal-container');
        addSearchResultEventListener(searchButton, pokemon);

        dropDown.appendChild(searchItem);
        searchItem.appendChild(searchButton);
        console.log(pokemon.name);
        } else {
            console.log('nope');

        let error = document.createElement('p');
        error.innerText = 'No Pokemon match your search criteria';
        dropDownModal.appendChild(error);
        }
        
        
    }

    dropDownModal.classList.add('dropdown-show');


}
document.getElementById('nav-button').addEventListener("click", (e) => navBarSearch(e));

//**************************END Nav-Bar Search***************************************//

    function getAll() {
        return dataSet;
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
    };
})();
//***********End of Pokemon Repository IIFE**************

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});





























