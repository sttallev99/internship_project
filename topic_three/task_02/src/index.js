import '../sass/style.scss';

let pokemonData = [];
let currPage = 0;
let limit = 8;

async function getPokemons(offset) {
    const query = `
        query GetPokemons($offset: Int!, $limit: Int!) {
            pokemons(offset: $offset, limit: $limit) {
                results {
                name
                image
                url
                id
                }
                next,
                previous
            }
        }
    `;

    const response = await fetch('https://graphql-pokeapi.graphcdn.app/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            query,
            variables: { offset, limit }
        })
    });

    const data = await response.json();
    return data.data.pokemons;
}

async function getEvolutionChain(pokemonUrl) {
    const pokemonResponse = await fetch(pokemonUrl);
    const pokemonData = await pokemonResponse.json();

    const speciesResponse = await fetch(pokemonData.species.url);
    const speciesData = await speciesResponse.json();

    const evolutionChainUrl = speciesData.evolution_chain.url;

    const evolutionResponse = await fetch(evolutionChainUrl);
    const evolutionData = await evolutionResponse.json();

    const evolutions = [];
    let current = evolutionData.chain;

    while(current) {
        evolutions.push(current.species.name);
        current = current.evolves_to[0];
    }
    console.log(evolutions)
    return evolutions;
}

function loadEvolutionNames( evolutionNames, pokemonName) {
    const pokemonNameIndex = evolutionNames.indexOf(pokemonName);
    evolutionNames = evolutionNames.splice(pokemonNameIndex);
    const evolutionNamesEl = document.createElement('div');
    evolutionNamesEl.classList.add('evoluations-names-container')
    
    if(evolutionNames.length <= 1) {
        return
    }

    const infoTextEl = document.createElement('p')
    infoTextEl.classList.add('evoluation-info-text')
    infoTextEl.innerHTML = 'Evolutions'
    evolutionNamesEl.appendChild(infoTextEl);
    for(let i = 1; i < evolutionNames.length; i++) {
        const evolutionName = document.createElement('p')
        evolutionName.innerHTML = evolutionNames[i];
        evolutionNamesEl.appendChild(evolutionName);
    }

    return evolutionNamesEl;
}

async function loadData(page) {
    if (page < 0) return;

    currPage = page;
    let offset = page * limit;
    const pokemons = await getPokemons(offset);
    pokemonData = pokemons.results;

    const pokemonContainerElement = document.querySelector('.pokemons-container');
    pokemonContainerElement.innerHTML = '';

    const evoluationNamesPromisify = pokemons.results.map(async p => {
        return await getEvolutionChain(p.url)
    });
    const evolutionNamesResult = await Promise.all(evoluationNamesPromisify);

    for(const [key, value] of Object.entries(pokemons.results)) {
        const pokemon = value
        const evolutionNames = evolutionNamesResult[key]

        const currPokemonContainerElement = document.createElement('div');
        currPokemonContainerElement.classList.add('single-pokemon-container');
        const pokemonImgElement = document.createElement('img');
        pokemonImgElement.classList.add('pokemon-img');
        const pokemenNameElement = document.createElement('p');
        pokemenNameElement.classList.add('pokemon-name')
        
        pokemonImgElement.src = pokemon.image;
        pokemenNameElement.innerHTML = pokemon.name
        
        currPokemonContainerElement.appendChild(pokemonImgElement);
        currPokemonContainerElement.appendChild(pokemenNameElement);
        const evoluationNamesEl = loadEvolutionNames(evolutionNames, pokemon.name)
        if (evoluationNamesEl) {
            currPokemonContainerElement.appendChild(evoluationNamesEl)
        } 

        pokemonContainerElement.appendChild(currPokemonContainerElement);

        currPokemonContainerElement.addEventListener('click', () => {
            location.href = '../dist/details.html?name=' + pokemon.name;
        })
    }
}


const prevBtnEl = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

nextBtn.addEventListener('click', () => {
    currPage += 1;
    loadData(currPage);
});

prevBtnEl.addEventListener('click', () => {
    currPage -= 1;
    loadData(currPage);
})

window.onload = () => loadData(0);

