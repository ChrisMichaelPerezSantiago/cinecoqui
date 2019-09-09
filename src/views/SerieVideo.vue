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
            <option v-for="(season , index) in bySeason[season_selected].episodes" :value="season" :key="index">
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

     <div class="jumbotron jumbotron-fluid" style="background:#232728 !important">
      <div class="container">
        <h1 class="display-4">
          {{title}}<br>
          <span style="font-size:26px" class="badge badge-dark">
            <span class="badge badge-warning">Servicio</span>
            {{channel}}
          </span>     
          <span style="font-size:26px" class="badge badge-dark">
            <span class="badge badge-warning">start</span>
            {{first_air_date}}
            </span>
          <span style="font-size:26px" class="badge badge-dark">
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

        <ul class="list-unstyled">
          <li class="media gallery">
            <img id="creatorImg" style="border-radius: 0.3em;" :src="creator_member.creator.poster" class="mr-3" :alt="creator_member.creator.name">
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

      </div>
    </div>
    
  </div>
</template>

<script>
  import {value , watch} from 'vue-function-api';
  import {useState , useStore , useRouter} from '@u3u/vue-hooks';

  export default{
    name: 'SerieVideo',
    setup(props , context){
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
        total_seasons: params.extra.value[0].season_list.length,
        season_list: params.extra.value[0].season_list
      };
      
      const season_selected = value(1);
      const episode_selected = value(null);
      const season_list = values.season_list;
      const episodesList = value([])
      const id = value(null)
      const option = value("");
      

      const bySeason = season_list.reduce((byId , seasons) =>{
        byId[seasons.season] = seasons
        return byId
      } , {});

      watch(() =>
        episode_selected.value , (value) =>{
          episode_selected.value = value;
          const eps = episode_selected.value;
          const id = `${params.id.value.replace('ver-' , '')}-${eps}`
          store.value.dispatch("GET_VIDEO_SERIES" , id)
        }
      );
      
      return{
        ...state,
        ...values,
        option,
        season_selected,
        episode_selected,
        bySeason,
        episodesList: episodesList.value
      }
    }
  }
</script>
