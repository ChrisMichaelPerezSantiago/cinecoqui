
<template>
  <div class="container">
    <BoxLink/> <!-- BOX -->
    <main class="Main">
      <div class="alert alert-primary" role="alert">
        Últimas peliculas
      </div>
      <div class="text-center" v-if="isLoading">
        <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
          <span class="sr-only">Loading...</span> 
        </div>
      </div>
      <div v-else>
        <ul else class="ListEpisodios AX Rows A06 C04 D02">
          <li v-for="(movie, index) in movies" :key="index">
            <Movies :movies="movie"/>
          </li>
        </ul>
      </div>
      <div> Página {{page}} de {{total_pages}}</div>
     <bPagination align="right" :total-rows="total_pages" :per-page="1" v-model="page" @input =" init(page);"></bPagination>
    </main>
  </div>
</template>

<script>
  import { value , onCreated , watch } from "vue-function-api";
  import { useState, useStore } from "@u3u/vue-hooks";
  import Movies from "../components/Movies";
  import BoxLink from '../components/BoxLink';

  export default {
    name: 'MovieSection',
    components:{
      Movies,
      BoxLink
    },
    setup(){
      const store = useStore();

      const state = {
        ...useState(["movies" , "isLoading"])
      };

      const page = value(1);
      const total_pages = value(106);

      watch(() =>
        page.value , (value) =>{
          page.value = value;
          const goto = page;
          init(goto)
        }
      )

      const init = (page) => {
        store.value.dispatch("GET_MOVIES" , page.value);
      }

      onCreated(() =>{
        store.value.dispatch("GET_MOVIES" , page.value);
      });

      return{
        ...state,

        init,
        page,
        total_pages
      }
    }
  };
</script>
