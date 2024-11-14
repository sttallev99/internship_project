import '../sass/style.scss';
import { pokemonApi } from './api_client.js';

let pokemonData = [];
let currPage = 0;
let limit = 8;
 
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
    const pokemons = await pokemonApi.getPokemons(offset, limit);
    pokemonData = pokemons.results;

    const pokemonContainerElement = document.querySelector('.pokemons-container');
    pokemonContainerElement.innerHTML = '';

    const evoluationNamesPromisify = pokemons.results.map(async p => {
        return await pokemonApi.getEvolutionChain(p.url)
    });
    const evolutionNamesResult = await Promise.all(evoluationNamesPromisify);
    console.log(evolutionNamesResult);

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

