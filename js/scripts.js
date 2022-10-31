let pokemonRepository = (function() {
    let pokemonList = [
        {name: 'Bulbasaur', type: ['Grass', 'poison'], height: .7},
        {name: 'Ivysaur', type: ['Grass', 'poison'], height: 1},
        {name: 'Venusaur', type: ['Grass', 'poison'], height: 2},
        {name: 'Charmander', type: 'Fire', height: .6},
        {name: 'Charmeleon', type: 'Fire', height: 1.1},
        {name: 'Charizard', type: ['Fire', 'Flying'], height: 1.7},
        {name: 'Squirtle', type: 'Water', height: .5},
        {name: 'Wartortle', type: 'Water', height: 1},
        {name: 'Blastoise', type: 'Water', height: 1.6},
    ]; 

    function add(pokemon) {
        if (typeof pokemon === 'object') {
            if (
                Object.keys(pokemon).includes('name') &&
                Object.keys(pokemon).includes('type') &&
                Object.keys(pokemon).includes('height')
            ) {
                pokemonList.push(pokemon);
            } else {
                alert('"Name", "Type", and "Height are required to add a new pokemon to the Pokedex');
            }
            
        } else {
            console.log('You can only add Objects to the list.');
        }
        
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    }
})();

let big = '- Wow, that\'s big!';

function loopList(pokemon){
    //Writes Name and Height of all Pokemon to the DOM AND Labels biggest Pokemon  
    if (pokemon.height > 1.7) {
        document.write('<div>' + pokemon.name + ' (height: ' + pokemon.height + ' m) ' + big + '</div>');
    } 
    //Writes Name and Height of all Pokemon to the DOM
    else {
        document.write('<div>' + pokemon.name + ' (height: ' + pokemon.height + ' m)' + '</div>');
    }
}
pokemonRepository.getAll().forEach(loopList);

console.log(pokemonRepository.getAll());

let pikachu = {name: 'Pikachu', type: 'Electric', height: .4};

pokemonRepository.add(pikachu);
console.log(pokemonRepository.getAll());

pokemonRepository.add({name: 'Caterpie', type: 'Bug', height: .3});
console.log(pokemonRepository.getAll());

pokemonRepository.add({name: 'Metapod', type: 'Bug'});
console.log(pokemonRepository.getAll());

pokemonRepository.add('Butterfree');
console.log(pokemonRepository.getAll());