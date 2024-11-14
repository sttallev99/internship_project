import { pokemonApi } from "./api_client.js";

const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
const pokemonName = urlParams.get('name');

async function showPokemonDetails(name) {
    const pokemon = await pokemonApi.getPokemonDetails(name);
    const pokemonContainer = document.querySelector('.pokemon-details-container');
    for(let currSpec of Object.entries(pokemon)) {
        const currPokemonDetail = document.createElement('p');
        const [specName, specValue] = currSpec;
        if(Array.isArray(specValue)) {
            let output = []
            specValue.forEach(currProp => {
                const x = Object.values(currProp);
                x.forEach(y => {
                    const [name] = Object.values(y);
                    output.push(name);
                })
            });
            currPokemonDetail.innerHTML = `${specName} - ${output.join(', ')}`;
        } else {
            currPokemonDetail.innerHTML = `${specName} - ${specValue}`
        }
        pokemonContainer.appendChild(currPokemonDetail)
    }
}

window.onload = () => showPokemonDetails(pokemonName);
