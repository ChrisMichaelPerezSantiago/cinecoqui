
<template>
  <div class="container">
    <BoxLink/> <!-- BOX -->
    <main class="Main">
      <div class="alert alert-primary" role="alert">
        Mejores Series Posicionados
      </div>
      <div class="text-center" v-if="isLoading">
        <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
          <span class="sr-only">Loading...</span> 
        </div>
      </div>
      <div v-else>
        <ul else class="ListEpisodios AX Rows A06 C04 D02">
          <li v-for="(serie, index) in best_series" :key="index">
            <Series :series="serie"/>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import { value, onCreated, watch } from "vue-function-api";
import { useState, useStore } from "@u3u/vue-hooks";
import Series from "../components/Series";
import BoxLink from "../components/BoxLink";

export default {
  name: "BestRankedSeries",
  components: {
    Series,
    BoxLink
  },
  setup() {
    const store = useStore();

    const state = {
      ...useState(["best_series" , "isLoading"])
    };

    onCreated(() => {
      store.value.dispatch("GET_BEST_RANKED_SERIES");
    });

    return {
      ...state,
    };
  }
};
</script>
