const pokemonName = document.querySelector('.pokemon-name');

const pokemonNumber = document.querySelector('.pokemon-number');

const pokemonHifen = document.querySelector('.hifen');

const pokemonGif = document.querySelector('.pokemon-img');

const form = document.querySelector('.form');

const input = document.querySelector('.input-search');

const prev = document.querySelector('.btn-prev');

const next = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {

        const data = await APIResponse.json();

        return data;

    }
}

const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    pokemonGif.style.display = 'none';
    pokemonHifen.style.display = 'none';
    

    const data = await fetchPokemon(pokemon);

    

    if (data) {

        
        pokemonGif.style.display = 'block';
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        pokemonGif.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        
        input.value = '';
        searchPokemon = data.id;
        
    } else {
        pokemonGif.style.display = 'none';
        pokemonHifen.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';

    }

    if(pokemonName.innerHTML.length >= 18){
        
        pokemonName.style.fontSize = "clamp(8px, 5vw, 20px)";

    } else {

        pokemonName.style.fontSize = "clamp(8px, 5vw, 25px)";
        
    }
    // console.log(pokemonName.innerHTML.length);
    // console.log(pokemonName.innerHTML);

}


form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

});

prev.addEventListener('click', () => {

    // alert('prev clicked')
    if (searchPokemon > 1){

        searchPokemon -= 1;
        renderPokemon(searchPokemon)

    }     

});

next.addEventListener('click', () => {

        // alert('next clicked')
        searchPokemon += 1;
        renderPokemon(searchPokemon)

});

    renderPokemon(searchPokemon)




