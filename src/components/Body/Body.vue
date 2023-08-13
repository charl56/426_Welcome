<template>
    <div class="d-flex justify-center pa-3 ma-1">
        <v-btn class="mx-3" variant="outlined" @click="openPage('charles/')">Projets de Charles</v-btn>
        <v-btn class="mx-3" variant="outlined" @click="openPage('pol/')">Projets de Pol</v-btn>
    </div>
</template>
  
<script>

export default {
    name: 'AppBody',
    components: {
    },
    created(){
    },
    data () {
        return {
        }
    },
    methods:{
        openPage(uri){
            location.href = location.href + uri
        }
        
    },
}
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>