
<template>
  <div class="container">
    <BoxLink/> <!-- BOX -->

    <main class="Main">
      <div class="alert alert-primary" role="alert">
        Últimos episodios
      </div>
      <div class="text-center" v-if="isLoading">
        <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
          <span class="sr-only">Loading...</span> 
        </div>
      </div>
      <div v-else>
        <ul else class="ListEpisodios AX Rows A06 C04 D02">
          <li v-for="(eps, index) in episodes" :key="index">
            <Episodes :episodes="eps"/>
          </li>
        </ul>
      </div>
      <div> Página {{page}} de {{total_pages}}</div>
      <bPagination align="right" :total-rows="total_pages" :per-page="1" v-model="page" @input ="init(page)"></bPagination>
    </main>
  </div>
</template>

<script>
import { value, onCreated, watch } from "vue-function-api";
import { useState, useStore } from "@u3u/vue-hooks";
import Episodes from "../components/Episodes";
import BoxLink from "../components/BoxLink";

export default {
  name: "EpisodesSection",
  components: {
    Episodes,
    BoxLink
  },
  setup() {
    const store = useStore();

    const state = {
      ...useState(["episodes", "isLoading"])
    };

    const page = value(1);
    const total_pages = value(195);

    watch(() => 
      page.value , (value) => {
        page.value = value;
        const goto = page;
        init(goto);
      }
    );

    const init = page => {
      store.value.dispatch("GET_EPISODES", page.value);
    };

    onCreated(() => {
      store.value.dispatch("GET_EPISODES", page.value);
    });

    return {
      ...state,
      init,
      page,
      total_pages
    };
  }
};
</script>
