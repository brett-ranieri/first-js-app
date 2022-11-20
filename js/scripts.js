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



    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json(); //parses the response body into JSON data
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    height: item.height,
                    detailsUrl: item.url
                }; //creates Javascript objects and assigns keys
                add(pokemon); //calls add function
            });
        }).catch(function (e) {
            console.error(e);
        });
    }


    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json(); //parses the response body into JSON data
        }).then(function(details) { //believe this is how you talk to API to pull specific data and assign it to a key
            item.imageUrl = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types.map((type) => type.type.name).join(', '); //needed to update to show text of types - basic understanding of what is happening here...
        }).catch(function (e) {
            console.error(e);
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

    function addListItem(pokemon) {
        let listItem = document.createElement('li'); //creates li
            listItem.classList.add('group-list-item'); // need to add this class to li's for bootstrap
            listItem.classList.add('col-12'); //sets li size based on breakpoints
            listItem.classList.add('col-md-6');
            listItem.classList.add('col-lg-4');

        let masterList = document.querySelector('.pokemon-list'); //targets location for newly created elements
        
        let card = document.createElement('div');
            card.classList.add('list-item'); //assigns class
            card.classList.add('group-list-item'); // need to add this class to li's for bootstrap     
        
        let pokemonImgFront = document.createElement('img');
            pokemonImgFront.classList.add('pokemon-image');
            pokemonImgFront.alt = 'Image of front of ' + pokemon.name;
            pokemonImgFront.src = pokemon.imageUrl;

        let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');    

        let cardHeader = document.createElement('h3');
            cardHeader.classList.add('card-head');
            cardHeader.innerText = pokemon.name.toUpperCase(); //names card

        let cardButton = document.createElement('button'); //creates buttons
            cardButton.innerText = 'View Details'
            cardButton.classList.add('card-btn'); //text of button
            // button.classList.add('list-item'); //assigs class to button
            // button.classList.add('index-list-item');
            // button.classList.add('group-list-item'); // need to add this class to li's for bootstrap
            // button.classList.add('col-sm-12'); //sets button size based on breakpoints
            cardButton.setAttribute('data-toggle', 'modal'); //BOOTSTRAP: tells button to toggle the modal
            cardButton.setAttribute('data-target', '#modal-container'); //BOOTSTRAP: specifies the target element that will be changed
            addPokemonEventListener(cardButton, pokemon); //assigns click for details to each button

        
        cardBody.appendChild(cardHeader);
        cardBody.appendChild(cardButton);

        card.appendChild(pokemonImgFront);
        card.appendChild(cardBody);

        //add to UL
        listItem.appendChild(card); //adds newly created card as li
        masterList.appendChild(listItem); //specifies that li should be included in HTML ul 
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
        pokemonImgFront.classList.add('modal-img');
        pokemonImgFront.alt = 'Image of front of ' + pokemon.name;
        pokemonImgFront.src = pokemon.imageUrl;

        let pokemonImgBack = document.createElement('img');
        pokemonImgBack.classList.add('modal-img');
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


//********************START Nav-Bar Search Function***********************************

function navBarSearch (e) {
    e.preventDefault()
    
    let searchField = document.getElementById('nav-search');
    let dropDown = document.getElementById('dropdown-list');
    let dropDownModal = document.getElementById('result-dropdown');
    dropDown.innerText = '';
    

    let pokemonList = pokemonRepository.getAll();
    let input = searchField.value.toLowerCase();
    const filteredPokemon = pokemonList.filter(x => x.name.toLowerCase().includes(input));
    console.log(filteredPokemon.length);
    
    noMatch(filteredPokemon);
    filteredPokemon.forEach(addToDropdown);

    function addSearchResultEventListener(element, pokemon) {
        element.addEventListener('click', function(e) {
             e.preventDefault();
             showDetails(pokemon);  
             document.getElementById('result-dropdown').classList.remove('dropdown-show');
             searchField.value = '';
             $("#result-dropdown button").remove();
             console.log('should be removed');
            });
      }  

    function noMatch(array) {
        console.log('maybe');
        if ((array.length <= 0) || (array.length === 150)) {
            let error = document.createElement('li');
            error.innerText = 'No matching Pokemon...You gotta go catch \'em!';
            error.classList.add('error-list-item');
            error.classList.add('search-list-item');
            error.classList.add('group-list-item');
            error.classList.add('col-12');
            dropDown.appendChild(error);
            console.log('nope');
        }
    }

    function addToDropdown(pokemon) {
        if ((filteredPokemon.length > 0) && (filteredPokemon.length != 150)) {
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
        } 
    }

    function closeDrop () {
        let closeButton = document.createElement('button');
        closeButton.classList.add('btn');
        closeButton.classList.add('close-button');
        closeButton.innerText = 'Close';
        dropDownModal.appendChild(closeButton);
        closeButton.addEventListener("click", function (e){
            e.preventDefault();
            searchField.value = '';
            dropDownModal.classList.remove('dropdown-show');
            dropDownModal.removeChild(closeButton);
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dropDownModal.classList.contains('dropdown-show')) {
            console.log('saw it');
            dropDownModal.classList.remove('dropdown-show');
            $("#result-dropdown button").remove();
        }
    });

    closeDrop();
    dropDownModal.classList.add('dropdown-show');
}

document.getElementById('nav-button').addEventListener("click", (e) => navBarSearch(e));

//**************************END Nav-Bar Search***************************************//

function getAll(){
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

//*******************START - Loading Message****************************************
    
let loadingMessage = document.querySelector('#loading-message');

function showLoadingMessage() {
    if (document.readyState !== 'complete') {
        loadingMessage.classList.add('loading');
    }
}
function hideLoadingMessage() {
    if (document.readyState === 'complete') {
        loadingMessage.classList.remove('loading');
    }
}


//********************END - Loading Message******************************************  

pokemonRepository.loadList().then(function() { //Calls all functions in IIFE to populate the UL on load
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.loadDetails(pokemon).then(function () {
            showLoadingMessage();
            pokemonRepository.addListItem(pokemon);
        }); 
    });
    hideLoadingMessage();
});

showLoadingMessage();



























