<template>
  <v-app id="app">
    <div v-if="game">
      <!-- Jeu -->
      <Game />
    </div>
    <div v-else>
      <Header />
      <Body />
    </div>
  </v-app>
</template>

<script>
import Game from './components/Game/Game.vue'
import Header from './components/Header/Header.vue'
import Body from './components/Body/Body.vue'

export default {
  name: 'App',
  components: {
    Game,
    Header,
    Body,
  },
  data(){
    return {
      game: false,
    }
  },
  created(){
    console.log()
    if(window.innerWidth < 800){
      this.game = false
    } else {
      this.game = true
    }
  }
}
</script>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
html::-webkit-scrollbar {
  display: none;
}

html {
  margin: 0;
  height: 100%;
  background-color: #EFEFEF;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #EFEFEF !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
/* Surlignage du texte */
::selection{
  background-color: #ebe5dc;
  color: #7eb3e8;
}
::-moz-selection{
  background-color: #ebe5dc;
  color: #2c3e50;
}
</style>