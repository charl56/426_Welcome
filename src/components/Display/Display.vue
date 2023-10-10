<template>
    <div v-if="welcome" class="display d-flex flex-column align-center justify-center">
        <div>
            <p class="text-h5 font-weight-bold">Bienvenue</p>
        </div>
        <div>
            <p class="text-h6">(press space)</p>
        </div>
    </div>   
</template>

<script>
import { eventBus } from '../../plugins/eventBus'   

export default {
    name: 'AppDisplay',
    created(){
        eventBus.on("welcome", (value) => {
            this.welcome = value
        })
    },
    mounted(){ // Lance la fonction au chargement de la page
    },
    data () {
        return {
            welcome: false
        }
    },
    methods:{
    },
    computed: {
    }

}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.display{
    position:absolute;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer !important;
}
p{
    color: black;
}




</style>