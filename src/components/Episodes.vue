<template>
  <div>
    <router-link  style="box-shadow: 0 5px 50px rgba(0, 0, 0, 0.85);"  :to="{name: 'EpisodeVideo' , params:{id: episode.id , title: episode.title , episode_name: episode.episode_name , poster: episode.poster , quality: episode.quality , sinopsis: episode.sinopsis}}">
      <a :style="{ 'background-image': 'url(' + episode.poster + ')' }" :title="episode.title" class="fas fa-play">
        <span class="Image"><img :src="episode.poster" :alt="episode.episode_name"></span>
        <strong class="Title">{{episode.title}}</strong>
        <span class="Capi">
          {{episode.episode_name}}<br>
          <span>{{episode.date}}</span>
        </span>
      </a>
    </router-link>
  </div>  
</template>

<script>
import { value } from "vue-function-api";

export default {
  name: "Episodes",
  props: {
    episodes: Object
  },
  setup(props) {
    const episode = value(props.episodes);

    return {
      episode
    };
  }
};
</script>