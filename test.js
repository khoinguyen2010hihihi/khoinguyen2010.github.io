let offset = 0;
let numberOfRender = 36;

let allPokemons = [];
let filteredPokemons = [];

let htmlPokemon = "";
let htmlType = "";

async function fetchAPI(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
  }
}

async function getPokemon() {
  const data = await fetchAPI('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898');
  console.log(data);
  allPokemons = data.results;
  filteredPokemons = allPokemons;
  renderPokemons();
}

function getIDPokemon(url) {
    const parts = url.split('/'); 
    return parseInt(parts[parts.length - 2], 10);
}

async function renderPokemons() {
    for(let i = offset; i < offset + numberOfRender &&  i < filteredPokemons.length; i++) {
      const pokemon = filteredPokemons[i];

      const ID = getIDPokemon(pokemon.url);

      const typeData = await fetchAPI(pokemon.url);
      htmlType = "";
      typeData.types.forEach(element => {
        htmlType += `
          <div class="types__item ${element.type.name}">${element.type.name}</div>
        `;
      });

      htmlPokemon += `
      <div class="item">
        <div class="item__id">
          #${ID}
        </div>

        <div class="item__image" style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png');"></div>

        <div class="item__name">
          ${pokemon.name}
        </div>

        <div class="types">
          ${htmlType}
        </div>
      </div>
      `;
    }

    const itemPokemon = document.querySelector('.wrapper');
    itemPokemon.innerHTML = htmlPokemon;
    setupLoadMore();
}

function setupLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more');
    if (offset + numberOfRender < filteredPokemons.length) {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.onclick = () => {
            offset += numberOfRender;
            renderPokemons();
        };
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

function searchPokemon(query) {
    htmlPokemon = "";
    if(query === '') {
        filteredPokemons = allPokemons;
    }
    else{
        filteredPokemons = allPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
    }
    offset = 0;
    renderPokemons();
}
const searchInput = document.querySelector('.header__search');
console.log(searchInput)

searchInput.addEventListener('input', (event) => {
  const query = event.target.value;
  searchPokemon(query);
});

getPokemon();