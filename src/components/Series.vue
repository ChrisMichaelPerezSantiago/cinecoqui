<template>
  <div>
    <router-link style="box-shadow: 0 5px 50px rgba(0, 0, 0, 0.85);" :to="{name: 'SerieVideo' , params:{id: serie.id , title: serie.title , sinopsis: serie.sinopsis , extra: serie.extra}}">
      <a :style="{ 'background-image': 'url(' + serie.poster + ')' }" :title="serie.title" class="fas fa-play">
        <span class="Image"><img :src="serie.poster" :alt="serie.title"></span>
        <strong class="Title">{{serie.title}}</strong>
        <span class="Capi">{{serie.year}}  <i class="fas fa-star"><span>{{serie.rating}}</span></i> </span>
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