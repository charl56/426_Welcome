<template>
    <div v-if="welcome" class="display if-welcome d-flex flex-column align-center justify-center">
        <div>
            <p class="text-h5 font-weight-bold">Bienvenue</p>
        </div>
        <div>
            <p class="text-h6">(press space)</p>
        </div>
        <div>
            <p class="text-h6 mt-5">ZQSD + mouse to move</p>
            <p class="text-h6 m">Press E to open map</p>
            <p class="text-h6 m">Press R to open remote</p>
            <p class="text-h6 m">Press P to play/pause sound</p>
        </div>
    </div>  
    <div v-else class="display else-welcome d-flex flex-column align-center justify-start">
        <v-row class="row-mini-map align-center justify-end">
            <MiniMap />
        </v-row>
        <ExitMap />
        <Remote />
    </div>   
</template>

<script>
import MiniMap from './MiniMap/MiniMap.vue'
import ExitMap from './ExitMap/ExitMap.vue'
import Remote from './Remote/Remote.vue'

import { eventBus } from '../../plugins/eventBus'   


export default {
    name: 'AppDisplay',
    components: {
        ExitMap, 
        Remote,
        MiniMap,
    },
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
/* Basic display */
.display{
    position:absolute;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
p{
    color: black;
}

/* v-if welcome */
.if-welcome{
    cursor: pointer !important;
    backdrop-filter: blur(3px);
}



/* v-else welcome */
.else-welcome{
    cursor: none !important;
}

.row-mini-map{
    position : absolute ;
    width: 100%;
    height: 20vh;
}
</style>