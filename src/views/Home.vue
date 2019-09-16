
<template>
  <div class="container">
    <BoxLink/> <!-- BOX -->
    <main class="Main">
      <div class="alert alert-primary" role="alert">
        Últimas series
      </div>
      <div class="text-center" v-if="isLoading">
        <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
          <span class="sr-only">Loading...</span> 
        </div>
      </div>
      <div v-else>
        <ul else class="ListEpisodios AX Rows A06 C04 D02">
          <li v-for="(serie, index) in series" :key="index">
            <Series :series="serie"/>
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
  import Series from "../components/Series";
  import BoxLink from '../components/BoxLink';

  export default {
    name: 'home',
    components:{
      Series,
      BoxLink,
    },
    setup(){
      const store = useStore();

      const state = {
        ...useState(["series" , "latestEpisodes" , "isLoading"])
      };

      const page = value(1);
      const total_pages = value(16);

      watch(() =>
        page.value , (value) =>{
          page.value = value;
          const goto = page;
          init(goto)
        }
      )

      const init = (page) => {
        store.value.dispatch("GET_SERIES" , page.value);
      }

      onCreated(() =>{
        store.value.dispatch("GET_SERIES" , page.value);
        store.value.dispatch("GET_LASTESTS_EPISODES");
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
