const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const sprite = document.getElementById('sprite');

searchButton.addEventListener('click', searchPokemon);
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchPokemon();
    }
});

async function searchPokemon() {
const searchTerm = searchInput.value.toLowerCase();
try {
const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
if (!response.ok) {
    throw new Error('Pokémon not found');
}
const data = await response.json();
updatePokemonInfo(data);
} catch (error) {
alert('Pokémon not found');
clearPokemonInfo();
}
}

function updatePokemonInfo(data) {
    pokemonName.textContent = data.name.toUpperCase();
    pokemonId.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`; // Keep as is, without dividing by 10
    height.textContent = `Height: ${data.height}`; // Keep as is, without dividing by 10
    hp.textContent = `${data.stats.find(stat => stat.stat.name === 'hp').base_stat}`;
    attack.textContent = `${data.stats.find(stat => stat.stat.name === 'attack').base_stat}`;
    defense.textContent = `${data.stats.find(stat => stat.stat.name === 'defense').base_stat}`;
    specialAttack.textContent = `${data.stats.find(stat => stat.stat.name === 'special-attack').base_stat}`;
    specialDefense.textContent = `${data.stats.find(stat => stat.stat.name === 'special-defense').base_stat}`;
    speed.textContent = `${data.stats.find(stat => stat.stat.name === 'speed').base_stat}`;

    types.innerHTML = '';
    data.types.forEach(type => {
        const typeSpan = document.createElement('span');
        typeSpan.textContent = type.type.name.toUpperCase();
        typeSpan.style.backgroundColor = getTypeColor(type.type.name);
        types.appendChild(typeSpan);
    });

    sprite.src = data.sprites.front_default;
    sprite.style.display = 'block';
}

function clearPokemonInfo() {
    pokemonName.textContent = '';
    pokemonId.textContent = '';
    weight.textContent = '';
    height.textContent = '';
    types.innerHTML = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    specialAttack.textContent = '';
    specialDefense.textContent = '';
    speed.textContent = '';
    sprite.src = '';
    sprite.style.display = 'none';
}

function getTypeColor(type) {
    const typeColors = {
        normal: '#A8A878', fire: '#F08030', water: '#6890F0',
        electric: '#F8D030', grass: '#78C850', ice: '#98D8D8',
        fighting: '#C03028', poison: '#A040A0', ground: '#E0C068',
        flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
        rock: '#B8A038', ghost: '#705898', dragon: '#7038F8',
        dark: '#705848', steel: '#B8B8D0', fairy: '#EE99AC'
    };
    return typeColors[type] || '#68A090';
}