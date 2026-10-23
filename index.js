//DESARROLLA AQUI TUS SOLUCIONES

// Ejercicio 1
async function getRandomPokemon() {
    const id = Math.floor(Math.random() * 1025) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
}

// Ejercicio 2
async function getImageAndName(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();
    const name = data.name;
    const img = data.sprites.front_default;
    return { img, name };
}

// Ejercicio 3
async function printImageAndName(pokemon) {
    const { img, name } = pokemon
        ? await getImageAndName(pokemon)
        : await getImageAndName((await getRandomPokemon()).name);
    return `
<section>
    <img src="${img}" alt="${name}">
    <h1>${name}</h1>
</section>`;
}

// Ejercicio 4
async function getRandomDogImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    return data.message;
}

// Ejercicio 5
async function getRandomPokemonImage() {
    const pokemon = await getRandomPokemon();
    return pokemon.sprites.front_default;
}

// Ejercicio 6
async function printPugVsPikachu() {
    const responsePug = await fetch('https://dog.ceo/api/breed/pug/images/random');
    const dataPug = await responsePug.json();
    const pikachu = await getImageAndName('pikachu');

    const battle = document.createElement('section');
    battle.innerHTML = `
        <h1>Pug VS Pikachu</h1>
        <img src="${dataPug.message}" alt="pug" width="200">
        <img src="${pikachu.img}" alt="${pikachu.name}" width="200">`;
    document.body.appendChild(battle);
}

// Ejercicio 7
async function getRandomCharacter() {
    const id = Math.floor(Math.random() * 826) + 1;
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await response.json();
    return data;
}

// Ejercicio 8
async function getRandomCharacterInfo() {
    const character = await getRandomCharacter();
    const responseEpisode = await fetch(character.episode[0]);
    const episode = await responseEpisode.json();
    return {
        img: character.image,
        name: character.name,
        episodes: character.episode,
        firstEpisode: episode.name,
        dateEpisode: episode.air_date
    };
}

// Ejercicio 9
async function printCharacterInfo() {
    const { img, name, episodes, firstEpisode, dateEpisode } = await getRandomCharacterInfo();

    const card = document.createElement('section');
    card.innerHTML = `
        <img src="${img}" alt="${name}">
        <h1>${name}</h1>
        <p>Aparece en ${episodes.length} episodios</p>
        <p>Primer episodio: ${firstEpisode} (${dateEpisode})</p>`;
    document.body.appendChild(card);
}

window.addEventListener('load', () => {
    printPugVsPikachu();
    printCharacterInfo();
});
