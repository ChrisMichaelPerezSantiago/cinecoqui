<template>
  <div>
    <router-link :to="{name: 'SerieVideo' , params:{id: serie.id , title: serie.title , sinopsis: serie.sinopsis , extra: serie.extra}}">
      <a :style="{ 'background-image': 'url(' + serie.poster + ')' }" :title="serie.title" class="fas fa-play">
        <span class="Image"><img :src="serie.poster" :alt="serie.title"></span>
        <strong class="Title">{{serie.title}}</strong>
        <span class="Capi">{{serie.year}}</span>
      </a>
    </router-link>
  </div>  
</template>

<script>
  import {value} from 'vue-function-api';

  export default{
    name: 'Series',
    props:{
      series: Object
    },
    setup(props){
      const serie = value(props.series);
  
      return{
        serie,
      }
    },
  };
</script>