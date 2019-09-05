<template>
  <div id="container" style="margin-top: -10px; padding-top: 0;">
    <span class="pbox"></span>
    <div id="reproductor-box">
      <div class="video-header">
        <h1>
          </h1>
        <form class="video-section">
          <select class="container" v-model="season_selected">
            <option disabled value="">Temporadas</option>
            <option  v-for="(season , index) in Array.from({length: total_seasons}, (v , k) => k + 1)" :value="season" :key="index">
              {{ season }}
            </option>
          </select>
          <select class="container" v-model="episode_selected">
            <option disabled value="">Episodios</option>
            <option v-for="(season , index) in episodesList[season_selected - 1]" :value="season" :key="index">
              {{ season }}
           </option>
          </select>
          <select class="container" v-model="option">
            <option disabled value="">Videos</option>
            <option v-for="(video , index) in serie_video.map(xs => xs.iframe)" :value="video" :key="index">
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
            >
          </iframe>
      </div>
    </div>   

     <div class="jumbotron jumbotron-fluid" style="background:#144463 !important">
      <div class="container">
        <h1 class="display-4">
          {{title}}<br>
          <span style="font-size:27px" class="badge badge-secondary">
            <span class="badge badge-warning">Servicio</span>
            {{channel}}
          </span>     
          <span style="font-size:27px" class="badge badge-secondary">
            <span class="badge badge-warning">start</span>
            {{first_air_date}}
            </span>
          <span style="font-size:27px" class="badge badge-secondary">
            <span class="badge badge-warning">end</span>
            {{last_air_date}}
          </span>
            <span style="font-size:16px" class="badge badge-warning">
            ¡Importante!
            <span class="badge badge-primary"> Anuncios en los vídeos</span>
          </span>

        </h1> 
        <p class="lead">{{sinopsis}}</p>
        <hr/>

        <span style="font-size:18px" class="badge badge-secondary">
          <span class="badge badge-warning">Creator</span>
          {{creator_member.creator.name}}
          <img :src="creator_member.creator.poster">
        </span>
        <hr/>    
        
      </div>
    </div>
    
  </div>
</template>

<script>
  import {value , watch} from 'vue-function-api';
  import {useState , useStore , useRouter} from '@u3u/vue-hooks';

  export default{
    name: 'SerieVideo',
    setup(){
      const store = useStore();
      const {route} = useRouter();

      const state = {
        ...useState(['serie_video' , 'isLoading'])
      };

      const params = {
        id: value(route.value.params.id),
        title: value(route.value.params.title),
        sinopsis: value(route.value.params.sinopsis),
        extra: value(route.value.params.extra)
      };

      const values = {
        title: params.title.value,
        sinopsis: params.sinopsis.value,
        channel: params.extra.value[0].channel,
        first_air_date: params.extra.value[0].first_air_date.replace('First air date' , ''),
        last_air_date: params.extra.value[0].last_air_date.replace('Última transmisión' , ''),
        creator_member: params.extra.value[0].cast_members,
        members_list: params.extra.value[0].cast_members,
        total_seasons: params.extra.value[0].total_seasons,
        season_list: params.extra.value[0].season_list
      };

      const season_selected = value(null);
      const episode_selected = value(null);
      const season_list = values.season_list;
      const episodesList = value([])
      const id = value(null)
      const option = value("");

      
      watch(() =>
        season_selected.value , (value) =>{
          season_selected.value = value
          const selected = season_selected.value;  // season selected
          episodesList.value.push(season_list[selected - 1].episodes); // list of episodes          
        }
      );


      watch(() =>
        episode_selected.value , (value) =>{
          episode_selected.value = value;
          const eps = episode_selected.value;
          const id = `${params.id.value}-${eps}`;
          store.value.dispatch("GET_VIDEO_SERIES" , id)
        }
      );

      return{
        ...state,
        ...values,
        option,
        season_selected,
        episode_selected,
        season_list,
        episodesList: episodesList.value
      }
    }
  }
</script>
