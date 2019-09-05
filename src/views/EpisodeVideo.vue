<template>
  <div id="container" style="margin-top: -10px; padding-top: 0;">
    <span class="pbox"></span>
    <div id="reproductor-box">
      <div class="video-header">
        <h1></h1>
        <form class="video-section">
          <select class="container" v-model="option">
            <option disabled value="">Videos</option>
            <option v-for="(video , index) in serie_video.map(xs => xs.iframe)"
              :value="video"
              :key="index"
            >
              {{ video }}
            </option>
          </select>
        </form>              
      </div>
       <div class="embed-responsive embed-responsive-21by9">
          <iframe 
            ref="video" 
            style="background-color:black;" 
            class="embed-responsive-item" 
            id="_video"
            :src="option.video_iframe"
            frameborder="0"
            allowfullscreen
          >
          </iframe>
      </div>
    </div>   

     <div class="jumbotron jumbotron-fluid" style="background:#144463 !important">
      <div class="container">
        <h1 class="display-4">
          {{title}}
          <br>
          <span style="font-size:27px" class="badge badge-secondary">
            <span class="badge badge-warning">Episodio</span>
            {{episode_name}}
          </span>
          <span style="font-size:27px" class="badge badge-secondary">
            <span class="badge badge-warning">Calidad</span>
            {{quality}}
          </span>

        </h1> 
        <hr/>
      </div>
    </div>
    
  </div>
</template>

<script>
import { value, watch , onCreated } from "vue-function-api";
import { useState, useStore, useRouter } from "@u3u/vue-hooks";

export default {
  name: "EpisodeVideo",
  setup() {
    const store = useStore();
    const { route } = useRouter();

    const state = {
      ...useState(["serie_video", "isLoading"])
    };
    

    const params = {
      id: value(route.value.params.id),
      title: value(route.value.params.title),
      episode_name: value(route.value.params.episode_name),
      episode_poster: value(route.value.params.poster),
      quality: value(route.value.params.quality)
    };

    const values = {
      id: params.id.value,
      title: params.title.value,
      episode_name: params.episode_name.value,
      episode_poster: params.episode_poster.value,
      quality: params.quality.value
    };

    const option = value("");

    watch(() =>
      option.value , (value) =>{
        option.value = value;
        console.log("option: " , option.value);
        
      }
    )

    onCreated(() =>{
      store.value.dispatch("GET_VIDEO_SERIES" , values.id);
    });


    return {
      ...state,
      ...values,
      option
    };
  }
};
</script>
