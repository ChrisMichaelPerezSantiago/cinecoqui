<template>
  <div>
    <router-link :to="{name: 'MovieVideo' , params:{id: movie.id , title: movie.title , quality: movie.quality , sinopsis: movie.sinopsis , year: movie.year , extra: movie.extra}}">
      <a :style="{ 'background-image': 'url(' + movie.poster + ')' }" :title="movie.title" class="fas fa-play">
        <span class="Image"><img :src="movie.poster" :alt="movie.title"></span>
        <strong class="Title">{{movie.title}}</strong>
        <span class="Capi">{{movie.year}} <i class="fas fa-star"><span>{{movie.rating}}</span></i> </span>
      </a>
    </router-link>
  </div>  
</template>

<script>
  import {value} from 'vue-function-api';

  export default{
    name: 'Movies',
    props:{
      movies: Object
    },
    setup(props){
      const movie = value(props.movies);
  
      return{
        movie,
      }
    },
  };
</script>