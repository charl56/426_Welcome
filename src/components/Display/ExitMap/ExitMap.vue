<template>
    <div v-if="open" class="display d-flex flex-column align-center justify-center">
        <div class="exit-map">
            df
        </div>
    </div>   
</template>

<script>
import { eventBus } from '../../../plugins/eventBus'   

export default {
    name: 'AppDisplay',
    created(){
        eventBus.on("openExitMap", (value) => {
            this.open = value
        })
    },
    mounted(){ // Lance la fonction au chargement de la page
    },
    data () {
        return {
            open: false
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
/* Basic display */
.display{
    position:absolute;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer !important;
}

.exit-map{
    width: 50%;
    height: 60%;
    background-color: red;
}



</style>