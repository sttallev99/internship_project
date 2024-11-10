const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
const pokemonName = urlParams.get('name');
function getPokemonDetails() {
}

async function getPokemonDetails(name) {
    const query = `
        query GetPokemonDetails($name: String!) {
        pokemon(name: $name) {
                name
                height
                weight
                abilities {
                    ability {
                        name
                    }
                }
                moves {
                    move {
                        name
                    }
                }
            }
        }
    `

    const response = await fetch('https://graphql-pokeapi.graphcdn.app/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { name }})
    });

    const data = await response.json();
    return data.data.pokemon;
}

async function showPokemonDetails(name) {
    const pokemon = await getPokemonDetails(name);
    const pokemonContainer = document.querySelector('.pokemon-details-container');
    for(let currSpec of Object.entries(pokemon)) {
        const currPokemonDetail = document.createElement('p');
        [specName, specValue] = currSpec;
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

    // const pokemonImgEl = document.createElement('img')
    // pokemonImgEl.src = pokemon.image;
    // pokemonContainer.appendChild(pokemonImgEl);
}

window.onload = () => showPokemonDetails(pokemonName);
