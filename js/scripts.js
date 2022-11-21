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
                dataSet.push(pokemon); //add pokemon to data set
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
// console.log('1' + pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    function loadDetails(item) {
            //console.log('3 - ' + item.name);
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            //console.log('4 - ' + item.name);
            return response.json(); //parses the response body into JSON data
        }).then(function(details) { //believe this is how you talk to API to pull specific data and assign it to a key
            //console.log('5 - ' + item.name);
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
        }); //calls showModal after running loadDetails
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
        
        let card = document.createElement('div'); //creates card div
            card.classList.add('list-item'); //assigns class
            card.classList.add('group-list-item'); // need to add this class to li's for bootstrap     
        
        let pokemonImgFront = document.createElement('img');//creates image of each pokemon 
            pokemonImgFront.classList.add('pokemon-image');
            pokemonImgFront.alt = 'Image of front of ' + pokemon.name;
            pokemonImgFront.src = pokemon.imageUrl;

        let cardBody = document.createElement('div'); 
            cardBody.classList.add('card-body');    // div to store card content

        let cardHeader = document.createElement('h3'); 
            cardHeader.classList.add('card-head');
            cardHeader.innerText = pokemon.name.toUpperCase(); //fills in each pokemon name as h3

        let cardButton = document.createElement('button'); //creates View Details button
            cardButton.innerText = 'View Details';
            cardButton.classList.add('card-btn'); 
            cardButton.setAttribute('data-toggle', 'modal'); //BOOTSTRAP: tells button to toggle the modal
            cardButton.setAttribute('data-target', '#modal-container'); //BOOTSTRAP: specifies the target element that will be changed
            addPokemonEventListener(cardButton, pokemon); //assigns click for details to each button
      
        cardBody.appendChild(cardHeader);
        cardBody.appendChild(cardButton); //add header and button to card body

        card.appendChild(pokemonImgFront);
        card.appendChild(cardBody); // add card body and pokemon pic to card

        listItem.appendChild(card);
        masterList.appendChild(listItem); //add card to list
        //console.log('6 - ' + pokemon.name);
    }

function getAll(){
    return dataSet;
}

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
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
//***********************Start Load Content ***********************************************
pokemonRepository.loadList().then(function() { //Calls all functions in IIFE to populate the UL on load
    showLoadingMessage();
    pokemonRepository.getAll().forEach(function(pokemon){
        //    console.log('1 - ' + pokemon.name);
        pokemonRepository.loadDetails(pokemon).then(function () {
            pokemonRepository.addListItem(pokemon);
        //    console.log('2 - ' + pokemon.name);
        }); 
    });
    hideLoadingMessage();
});

showLoadingMessage();
//***************************** End - Load Content ****************************************** 
//***********************START - BootStrap Modal***********************************
function showModal(pokemon){
    let modalBody = document.querySelector('.modal-body');
        modalBody.innerText = ''; //clears modal body

    let modalTitle = document.querySelector('.modal-title');
        modalTitle.innerText = ''; //clears modal title
    
    let pokemonName = document.createElement('h1');
        pokemonName.innerText = pokemon.name.toUpperCase(); //header with pokemon name

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

    modalTitle.appendChild(pokemonName); //add content to modal header
    modalBody.appendChild(pokemonImgFront);
    modalBody.appendChild(pokemonImgBack);
    modalBody.appendChild(pokemonType);
    modalBody.appendChild(pokemonHeight);
    modalBody.appendChild(pokemonWeight); //add content to modal body
}
//***************************END - BootStrap Modal*************************************
//********************START Nav-Bar Search Function***********************************
function navBarSearch (e) {
    e.preventDefault() //prevents reload on button click

    let searchField = document.getElementById('nav-search');
    let input = searchField.value.toLowerCase();
    let dropDown = document.getElementById('dropdown-list');
    let dropDownModal = document.getElementById('result-dropdown');
        dropDown.innerText = ''; //clears drop down
    
    let pokemonList = pokemonRepository.getAll();
    const filteredPokemon = pokemonList.filter(x => x.name.toLowerCase().includes(input)); //filters pokemon list and stores array of anything that matches input
    
    function noMatch(array) { //error message if no match to input
        if ((array.length <= 0) || (array.length === 150)) { //checks for no matchs or ALL matchs (meaning no input provided but search ran)
            let error = document.createElement('li');
                error.innerText = 'No matching Pokemon...You gotta go catch \'em!'; //error message text
                error.classList.add('error-list-item');
                error.classList.add('search-list-item');
                error.classList.add('group-list-item');
                error.classList.add('col-12'); //add classes to error
                dropDown.appendChild(error); //add error to drop down
        }
    }

    noMatch(filteredPokemon);

    function addSearchResultEventListener(element, pokemon) {
        element.addEventListener('click', function(e) {
                e.preventDefault(); //prevents reload on button click
                pokemonRepository.showDetails(pokemon);  //calls show Details from IIFE
                document.getElementById('result-dropdown').classList.remove('dropdown-show'); //removes visible class from drop down
                searchField.value = ''; //clears search field
                $("#result-dropdown button").remove(); //removes button from drop down - prevents duplicates from edge cases
            });
      }  

    function addToDropdown(pokemon) {
        if ((filteredPokemon.length > 0) && (filteredPokemon.length != 150)) { //checks for matches and makes sure it's not all items in array
            let searchItem = document.createElement('li');
                searchItem.classList.add('group-list-item');
                searchItem.classList.add('col-12');  //add classes

            let searchButton = document.createElement('button');
                searchButton.innerText = pokemon.name.toUpperCase(); //determine button text
                searchButton.classList.add('search-list-item');
                searchButton.classList.add('group-list-item');
                searchButton.classList.add('col-12'); //add classes
                searchButton.setAttribute('data-toggle', 'modal');
                searchButton.setAttribute('data-target', '#modal-container'); //set Attributes
            
            addSearchResultEventListener(searchButton, pokemon);

            dropDown.appendChild(searchItem);
            searchItem.appendChild(searchButton);
        } 
    }

    filteredPokemon.forEach(addToDropdown);

    function closeDrop () {
        let closeButton = document.createElement('button'); //create close button
            closeButton.classList.add('btn');
            closeButton.classList.add('close-button');
            closeButton.innerText = 'Close'; //add classes
            dropDownModal.appendChild(closeButton); //add to div

        closeButton.addEventListener("click", function (e){ //action on click
            e.preventDefault(); //prevents reload on press of button
            searchField.value = ''; //clears seach field
            dropDownModal.classList.remove('dropdown-show'); //removes class that makes visible
            dropDownModal.removeChild(closeButton); //removes child to prevent duplicates
        });
    }

    window.addEventListener('keydown', (e) => { //action on escape key press
        if (e.key === 'Escape' && dropDownModal.classList.contains('dropdown-show')) {
            dropDownModal.classList.remove('dropdown-show'); //removes class that makes visible
            $("#result-dropdown button").remove(); //removes child to precent duplicates
        }
    });

    closeDrop();
    dropDownModal.classList.add('dropdown-show'); //makes drop down visible
}

document.getElementById('nav-button').addEventListener("click", (e) => navBarSearch(e)); //calls search on click of button
//**************************END Nav-Bar Search***************************************//



























