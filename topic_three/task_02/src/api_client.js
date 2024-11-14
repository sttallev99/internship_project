export const pokemonApi = {
    getPokemons: async (offset, limit) => {
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
    },
    getEvolutionChain: async(pokemonUrl) => {
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
    },
    getPokemonDetails: async(name) => {
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
}
