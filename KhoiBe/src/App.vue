<script setup>
import { ref, onMounted } from 'vue'

let offset = 0;
let numberOfRender = 36;

let allPokemons = [];
let filteredPokemons = [];

const htmlPokemon = ref("");
const htmlType = ref("");

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
      htmlType.value = ""; 

      typeData.types.forEach(element => {
        htmlType.value += `
          <div class="types__item ${element.type.name}">${element.type.name}</div>
        `;
      });

      htmlPokemon.value += `
      <div class="item">
        <div class="item__id">
          #${ID}
        </div>

        <div class="item__image" style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png');"></div>

        <div class="item__name">
          ${pokemon.name}
        </div>

        <div class="types">
          ${htmlType.value}
        </div>
      </div>
      `;
    }

    const itemPokemon = document.querySelector('.wrapper');
    itemPokemon.innerHTML = htmlPokemon.value;
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
    htmlPokemon.value = "";
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

onMounted(() => {
  getPokemon();
  const searchInput = document.querySelector('.header__search');
  
  searchInput.addEventListener('input', (event) => {
    const query = event.target.value;
    searchPokemon(query);
  });
});
</script>


<template>
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
</head>

<body>
  <div class="app">
    <div class="container">
      <div class="header">
        <h2 class="header__title">Pokemon API</h2>
        <input type="text" placeholder="Enter Pokemon Name..." class="header__search">
      </div>
      
      <div class="wrapper" v-html="htmlPokemon">
        
      </div>
      
      <button class="load-more">Load more</button>
    </div>
  </div>
</body>
</template>

<style>
*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: "Inter", sans-serif;
}

.container{
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
}
.header{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 70px 0;
}
.header__title{
  color: #2c3e50;
  font-size: 37.5px;
  line-height: 60px;
  margin-bottom: 30px;
  font-weight: 400;
}
.header__search{
  width: 500px;
  padding: 20px;
  background-color: #fff;
  border-radius: 30px;
  font-family: "Arial", sans-serif;
  box-shadow: #64646f33 0px 7px 29px 0px;
  border: grey solid 1px;
}
.wrapper{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 15.87%);
  gap: 10px;
  padding: 0 10px;
}
.item{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  line-height: 24px;
  padding: 10px 5px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  transition: all .4s ease-in;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: cover;
}   
.item:hover{
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
}
.item__id{
  color: #2c3e50;
  font-size: 15px;
  line-height: 24px;
  text-align: center;
}   
.item__image{
  width: 100%;
  aspect-ratio: 1 / 1;
  background-size: contain;
  padding: 179.913px 0px 0px;
}
.item__name{
  font-size: 17.55px;
  font-weight: 700;
  line-height: 28.08px;
  text-align: center;
  text-transform: capitalize;
}
.types{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.types__item{
  font-size: 13px;
  border-radius: 5px;
  font-weight: 500;
  line-height: 20.8px;
  margin: 4px 3px;
  padding: 3px 4px;
  text-transform: capitalize;
}
.normal {
  background-color: #a8a77a; 
}

.fire {
  background-color: #ff421c; 
}

.water {
  background-color: #6390f0; 
}

.grass {
  background-color: #78cd54;
}

.electric {
  background-color: #f7d02c; 
}

.ice {
  background-color: #96d9d6; 
}

.fighting {
  background-color: #c22e28; 
}

.poison {
  background-color: #a33ea1; 
}

.ground {
  background-color: #e2bf65; 
}

.flying {
  background-color: #a98ff3; 
}

.psychic {
  background-color: #f95587;
}

.bug {
  background-color: #a6b91a; 
}

.rock {
  background-color: #b6a136; 
}

.ghost {
  background-color: #735797; 
}

.dragon {
  background-color: #6f35fc; 
}

.dark {
  background-color: #705746; 
}

.steel {
  background-color: #b7b7ce; 
}

.fairy {
  background-color: #d685ad; 
}
.load-more{
  background-color: #ff4d4f;
  border-radius: 10px;
  color: #fff;
  padding: 20px 25px;
  text-align: center;
  border: none;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}
@media screen and (max-width: 1199px) {
  .items{
      display: grid;
      grid-template-columns: repeat(4, 24.375%);
  }
}

@media screen and (max-width: 956px) {
  .items{
      display: grid;
      grid-template-columns: repeat(3, 32.77%);
  }
}

@media screen and (max-width: 768px) {
  .items{
      display: grid;
      grid-template-columns: repeat(2, 49.58%);
  }
}
</style>