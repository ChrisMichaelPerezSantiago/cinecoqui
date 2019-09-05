<template>
   <div class="container">
    <BoxLink/>
    <main class="Main">
      <div class="alert alert-primary" role="alert">
        Genero "{{genre}}"
      </div>
      <div v-if="isLoading">
        <!-- <img class="loading" src="../assets/loading.gif" alt="loading"> -->
      </div>
      <div v-else>
        <ul class="ListEpisodios AX Rows A06 C04 D02">
          <li v-for="(content, index) in genres" :key="index">
           <div v-if="content.type === 'serie'">
              <Series :series="content"/>
            </div>
            <div v-if="content.type === 'pelicula'">
              <Movies :movies="content"/>
            </div>
          </li>
        </ul>
      </div>
       <div> Página {{page}} de {{total_pages}}</div>
      <bPagination align="right" :total-rows="total_pages" :per-page="1" v-model="page" @input ="init(page)"></bPagination>
    </main>
  </div>
</template>


<script>
  import {value , onCreated , watch} from "vue-function-api"
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
        ...useState(['genres' , 'isLoading'])
      };

      const genre = value(route.value.params.genres);

      
      const page = value(1);
      const total_pages = value(105);

      watch(() =>
        page.value , (value) =>{
          page.value = value;
          const goto = page;
          const info = {genre: genre.value , page: goto}
          init(info)
        }
      )

      watch(() =>
        genre.value , (value) =>{
          genre.value = value;
          const goto = page;
          store.value.dispatch('GET_GENRES' , {
            genre: genre,
            page: goto
          });
        }
      )


      const init = (page) => {
        store.value.dispatch('GET_GENRES' , {
          genre: genre.value,
          page: page.value
        });
      }

      onCreated(() =>{
        store.value.dispatch('GET_GENRES' , {
          genre: genre.value,
          page: page.value
        });
      });
      
      return{
        ...state,
        init,

        page,
        genre,
        total_pages
      }
    }
  };
</script>