<template>
  <div id="container" style="margin-top: -10px; padding-top: 0;">
    <span class="pbox"></span>
    <div id="reproductor-box">
      <div class="video-header">
        <h1></h1>
        <form class="video-section">
          <select class="container" v-model="option">
            <option disabled value="">Videos</option>
            <option v-for="(video , index) in movie_video.map(xs => xs.iframe)"
              :value="video"
              :key="index"
            >
              {{ video.video_iframe }}
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

     <div class="jumbotron jumbotron-fluid" style="background:#232728 !important">
      <div class="container">
        <h1 class="display-4">
          {{title}}
          <br>
          <span style="font-size:25px" class="badge badge-dark">
            <span class="badge badge-warning">Duración</span>
            {{runtime}}
          </span>
          <span style="font-size:25px" class="badge badge-dark">
            <span class="badge badge-warning">País</span>
            {{country}}
          </span>
          <span style="font-size:25px" class="badge badge-dark">
            <span class="badge badge-warning">Lanzamiento</span>
            {{air_date}}
          </span>
        </h1> 
        <p class="lead">{{sinopsis}}</p>
        <hr/>
        <ul class="list-unstyled">
          <li class="media gallery">
            <img id="creatorImg" :src="creator_member.creator.poster" class="mr-3" :alt="creator_member.creator.name">
            <div class="media-body">
              <h5 class="mt-0 mb-1">{{creator_member.creator.name}}</h5>
              Creator
            </div>
          </li>
        </ul>
        <hr/>  
          <ul class="list-unstyled" v-for="(member, index) in members_list.members_list[0].members_info" :key="index">
          <li class="media">
            <img id="membersImg" :src="member.poster" class="mr-3" :alt="member.characters.real_name">
            <div class="media-body">
              <h5 class="mt-0 mb-1">{{member.characters.real_name}}</h5>
              {{member.characters.character}}
            </div>
          </li>
        </ul>
        <hr/>
      </div>
    </div>
    
  </div>
</template>

<script>
import { value, watch , onCreated } from "vue-function-api";
import { useState, useStore, useRouter } from "@u3u/vue-hooks";

export default {
  name: "MovieVideo",
  setup() {
    const store = useStore();
    const { route } = useRouter();

    const state = {
      ...useState(["movie_video", "isLoading"])
    };
    

    const params = {
      id: value(route.value.params.id),
      title: value(route.value.params.title),
      year: value(route.value.params.year),
      quality: value(route.value.params.quality),
      sinopsis: value(route.value.params.sinopsis),
      extra: value(route.value.params.extra)
    };

    const values = {
      id: params.id.value,
      title: params.title.value,
      year: params.year.value,
      quality: params.quality.value,
      sinopsis: params.sinopsis,
      creator_member: params.extra.value[0].cast_members,
      members_list: params.extra.value[0].cast_members,
      air_date: params.extra.value[0].air_date,
      runtime: params.extra.value[0].runtime,
      country: params.extra.value[0].country
    };

    const option = value("");

    console.log(values.sinopsis);


    onCreated(() =>{
      store.value.dispatch("GET_VIDEO_MOVIES" , values.id);
    });


    return {
      ...state,
      ...values,
      option
    };
  }
};
</script>
