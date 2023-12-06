<template>
    <div class="mini-map">
        <div class="point"></div>
    </div>
</template>

<script>
import { eventBus } from '../../../plugins/eventBus'   

export default {
    name: 'AppMiniMap',
    created(){
        eventBus.on("playerPosition", (data) => {
            // console.log(data.x, data.z)
            // this.position.x = data.x
            // this.position.z = data.z

            // console.log(this.miniMapHeight)
            // console.log(this.miniMapWidth)

            // let marginLeft = 
            // let marginTop = 

            // var point = document.querySelector('.point');

            // point.style.marginRight = '10px
        })
    },
    mounted(){ // Lance la fonction au chargement de la page
        var miniMap = document.querySelector('.mini-map');
        this.miniMapWidth = miniMap.offsetWidth;
        this.miniMapHeight = miniMap.offsetHeight;
    },
    data () {
        return {
            // Map size
            miniMapHeight: 0,
            miniMapWidth: 0,
            // Player pos
            position : {
                x: 0,
                z: 0,
            },
            positionMin : {
                x: 6,
                z: 0,
            },
            positionMax : {
                x: 18,
                z: -12,
            },
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
/* Size of mini map */
.mini-map{
    height: 20vh;
    width: 20vh;
    background-color: gray;
    filter: opacity(0.5);
}
/* Point du perso */
.point{
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50px;
    margin-left: 30px;
    margin-top: 30px;
}
</style>