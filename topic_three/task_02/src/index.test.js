import  { jest } from '@jest/globals';
import { pokemonApi } from "./api_client";

describe('test client_api', () => {
    let mockOne;
    let mockTwo;
    let mockThree;
    beforeEach(() => {
        mockOne = jest.spyOn(pokemonApi, 'getPokemons');
        mockOne.mockReturnValue({
            "results": [
                {
                    "name": "bulbasaur",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
                    "url": "https://pokeapi.co/api/v2/pokemon/1/",
                    "id": 1
                },
                {
                    "name": "ivysaur",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
                    "url": "https://pokeapi.co/api/v2/pokemon/2/",
                    "id": 2
                },
                {
                    "name": "venusaur",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
                    "url": "https://pokeapi.co/api/v2/pokemon/3/",
                    "id": 3
                },
                {
                    "name": "charmander",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
                    "url": "https://pokeapi.co/api/v2/pokemon/4/",
                    "id": 4
                },
                {
                    "name": "charmeleon",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
                    "url": "https://pokeapi.co/api/v2/pokemon/5/",
                    "id": 5
                },
                {
                    "name": "charizard",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
                    "url": "https://pokeapi.co/api/v2/pokemon/6/",
                    "id": 6
                },
                {
                    "name": "squirtle",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
                    "url": "https://pokeapi.co/api/v2/pokemon/7/",
                    "id": 7
                },
                {
                    "name": "wartortle",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
                    "url": "https://pokeapi.co/api/v2/pokemon/8/",
                    "id": 8
                }
            ],
            "next": "https://pokeapi.co/api/v2/pokemon/?offset=8&limit=8",
            "previous": null
        })

        mockTwo = jest.spyOn(pokemonApi, 'getPokemonDetails');
        mockTwo.mockReturnValue({
            "name": "bulbasaur",
            "height": 7,
            "weight": 69,
            "abilities": [
                {
                    "ability": {
                        "name": "overgrow"
                    }
                },
                {
                    "ability": {
                        "name": "chlorophyll"
                    }
                }
            ],
            "moves": [
                {
                    "move": {
                        "name": "razor-wind"
                    }
                },
                {
                    "move": {
                        "name": "swords-dance"
                    }
                },
                {
                    "move": {
                        "name": "cut"
                    }
                },
                {
                    "move": {
                        "name": "bind"
                    }
                },
                {
                    "move": {
                        "name": "vine-whip"
                    }
                },
                {
                    "move": {
                        "name": "headbutt"
                    }
                },
                {
                    "move": {
                        "name": "tackle"
                    }
                },
                {
                    "move": {
                        "name": "body-slam"
                    }
                },
                {
                    "move": {
                        "name": "take-down"
                    }
                },
                {
                    "move": {
                        "name": "double-edge"
                    }
                },
                {
                    "move": {
                        "name": "growl"
                    }
                },
                {
                    "move": {
                        "name": "strength"
                    }
                },
                {
                    "move": {
                        "name": "mega-drain"
                    }
                },
                {
                    "move": {
                        "name": "leech-seed"
                    }
                },
                {
                    "move": {
                        "name": "growth"
                    }
                },
                {
                    "move": {
                        "name": "razor-leaf"
                    }
                },
                {
                    "move": {
                        "name": "solar-beam"
                    }
                },
                {
                    "move": {
                        "name": "poison-powder"
                    }
                },
                {
                    "move": {
                        "name": "sleep-powder"
                    }
                },
                {
                    "move": {
                        "name": "petal-dance"
                    }
                },
                {
                    "move": {
                        "name": "string-shot"
                    }
                },
                {
                    "move": {
                        "name": "toxic"
                    }
                },
                {
                    "move": {
                        "name": "rage"
                    }
                },
                {
                    "move": {
                        "name": "mimic"
                    }
                },
                {
                    "move": {
                        "name": "double-team"
                    }
                },
                {
                    "move": {
                        "name": "defense-curl"
                    }
                },
                {
                    "move": {
                        "name": "light-screen"
                    }
                },
                {
                    "move": {
                        "name": "reflect"
                    }
                },
                {
                    "move": {
                        "name": "bide"
                    }
                },
                {
                    "move": {
                        "name": "sludge"
                    }
                },
                {
                    "move": {
                        "name": "skull-bash"
                    }
                },
                {
                    "move": {
                        "name": "amnesia"
                    }
                },
                {
                    "move": {
                        "name": "flash"
                    }
                },
                {
                    "move": {
                        "name": "rest"
                    }
                },
                {
                    "move": {
                        "name": "substitute"
                    }
                },
                {
                    "move": {
                        "name": "snore"
                    }
                },
                {
                    "move": {
                        "name": "curse"
                    }
                },
                {
                    "move": {
                        "name": "protect"
                    }
                },
                {
                    "move": {
                        "name": "sludge-bomb"
                    }
                },
                {
                    "move": {
                        "name": "mud-slap"
                    }
                },
                {
                    "move": {
                        "name": "outrage"
                    }
                },
                {
                    "move": {
                        "name": "giga-drain"
                    }
                },
                {
                    "move": {
                        "name": "endure"
                    }
                },
                {
                    "move": {
                        "name": "charm"
                    }
                },
                {
                    "move": {
                        "name": "false-swipe"
                    }
                },
                {
                    "move": {
                        "name": "swagger"
                    }
                },
                {
                    "move": {
                        "name": "fury-cutter"
                    }
                },
                {
                    "move": {
                        "name": "attract"
                    }
                },
                {
                    "move": {
                        "name": "sleep-talk"
                    }
                },
                {
                    "move": {
                        "name": "return"
                    }
                },
                {
                    "move": {
                        "name": "frustration"
                    }
                },
                {
                    "move": {
                        "name": "safeguard"
                    }
                },
                {
                    "move": {
                        "name": "sweet-scent"
                    }
                },
                {
                    "move": {
                        "name": "synthesis"
                    }
                },
                {
                    "move": {
                        "name": "hidden-power"
                    }
                },
                {
                    "move": {
                        "name": "sunny-day"
                    }
                },
                {
                    "move": {
                        "name": "rock-smash"
                    }
                },
                {
                    "move": {
                        "name": "facade"
                    }
                },
                {
                    "move": {
                        "name": "nature-power"
                    }
                },
                {
                    "move": {
                        "name": "helping-hand"
                    }
                },
                {
                    "move": {
                        "name": "ingrain"
                    }
                },
                {
                    "move": {
                        "name": "knock-off"
                    }
                },
                {
                    "move": {
                        "name": "secret-power"
                    }
                },
                {
                    "move": {
                        "name": "weather-ball"
                    }
                },
                {
                    "move": {
                        "name": "grass-whistle"
                    }
                },
                {
                    "move": {
                        "name": "bullet-seed"
                    }
                },
                {
                    "move": {
                        "name": "magical-leaf"
                    }
                },
                {
                    "move": {
                        "name": "natural-gift"
                    }
                },
                {
                    "move": {
                        "name": "worry-seed"
                    }
                },
                {
                    "move": {
                        "name": "seed-bomb"
                    }
                },
                {
                    "move": {
                        "name": "energy-ball"
                    }
                },
                {
                    "move": {
                        "name": "leaf-storm"
                    }
                },
                {
                    "move": {
                        "name": "power-whip"
                    }
                },
                {
                    "move": {
                        "name": "captivate"
                    }
                },
                {
                    "move": {
                        "name": "grass-knot"
                    }
                },
                {
                    "move": {
                        "name": "venoshock"
                    }
                },
                {
                    "move": {
                        "name": "acid-spray"
                    }
                },
                {
                    "move": {
                        "name": "round"
                    }
                },
                {
                    "move": {
                        "name": "echoed-voice"
                    }
                },
                {
                    "move": {
                        "name": "grass-pledge"
                    }
                },
                {
                    "move": {
                        "name": "work-up"
                    }
                },
                {
                    "move": {
                        "name": "grassy-terrain"
                    }
                },
                {
                    "move": {
                        "name": "confide"
                    }
                },
                {
                    "move": {
                        "name": "grassy-glide"
                    }
                },
                {
                    "move": {
                        "name": "tera-blast"
                    }
                },
                {
                    "move": {
                        "name": "trailblaze"
                    }
                }
            ]
        })

        mockThree = jest.spyOn(pokemonApi, 'getEvolutionChain');
        mockThree.mockReturnValue(['bulbasaur', 'ivysaur', 'venusaur']);
    })
    test('should return array with pagination', async () => {
      let result = await pokemonApi.getPokemons(0, 8);
      result = result.results;
      expect(result.length).toBe(8);
    })
    test('should return object with pokemon information when call getPokemonDetails method', async () => {
        let result = await pokemonApi.getPokemonDetails("bulbasaur");
        expect(result).toMatchObject({name: "bulbasaur"})
    });
    test('should return array with all evolution names when call getEvolutionChain method with given pokemon URL argument', async() => {
        let result = await pokemonApi.getEvolutionChain('https://pokeapi.co/api/v2/pokemon/1/');
        expect(result).toStrictEqual(['bulbasaur', 'ivysaur', 'venusaur']);
    })
});
