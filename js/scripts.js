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


let big = '- Wow, that\'s big!';
for (let i=0; i < pokemonList.length; i++) {
  //Writes Name and Height of all Pokemon to the DOM AND Labels biggest Pokemon  
    if (pokemonList[i].height > 1.7) {
        document.write('<div>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ' m) ' + big + '</div>');
    } 
    //Writes Name and Height of all Pokemon to the DOM
    else {
        document.write('<div>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ' m)' + '</div>');
    }
}

