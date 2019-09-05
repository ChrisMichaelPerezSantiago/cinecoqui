<template>
   <div class="container">
     <BoxLink/>
    <main class="Main">
      <div class="alert alert-primary" role="alert">
        Resultados para "{{query}}"
      </div>
      <div v-if="isLoading">
        <!-- <img class="loading" src="../assets/loading.gif" alt="loading"> -->
      </div>
      <div v-else>
        <ul class="ListEpisodios AX Rows A06 C04 D02">
          <li v-for="(content, index) in contentSearched" :key="index">
            <div v-if="content.type === 'serie'">
              <Series :series="content"/>
            </div>
            <div v-if="content.type === 'pelicula'">
              <Movies :movies="content"/>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>


<script>
  import {onCreated} from "vue-function-api"
  import {useState , useRouter , useStore} from '@u3u/vue-hooks';
  import BoxLink from "../components/BoxLink";
  import Movies from "../components/Movies";
  import Series from "../components/Series";

  export default{
    name: 'ContentSearched',
    components:{
      BoxLink,
      Movies,
      Series
    },
    setup(){
      const store = useStore();
      const {route} = useRouter();

      const state = {
        ...useState(['contentSearched' , 'isLoading'])
      };

      const query = route.value.params.query;

      onCreated(() =>{
        store.value.dispatch('GET_CONTENT_SEARCH' , query.value);
      });
      return{
        ...state,
        query,
      }
    }
  };
</script>