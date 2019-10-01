import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SerieVideo from './views/SerieVideo';
import Genres from "./views/Genres.vue";
import EpisodesSection from './views/EpisodesSection';
import EpisodeVideo from './views/EpisodeVideo';
import MovieSection from './views/MovieSection';
import MovieVideo from './views/MovieVideo';
import ContentSearched from './views/ContentSearched';
import ByGenre from './views/ByGenre';
import NotFound from './views/NotFound';
import BestRankedMovies from './views/BestRankedMovies.vue';
import BestRankedSeries from './views/BestRankedSeries.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/SerieVideo/:id',
      name: 'SerieVideo',
      component: SerieVideo,
    },
    {
      path: "/Genres",
      name: "Genres",
      component: Genres
    },
    {
      path: "/EpisodesSection",
      name: "EpisodesSection",
      component: EpisodesSection
    },
    {
      path: "/EpisodeVideo/:id",
      name: "EpisodeVideo",
      component: EpisodeVideo
    },
    {
      path: "/MovieSection",
      name: "MovieSection",
      component: MovieSection
    },
    {
      path: "/MovieVideo/:id",
      name: "MovieVideo",
      component: MovieVideo
    },
    {
      path: "/search",
      name: "ContentSearched",
      component: ContentSearched
    },
    {
      path: "/Genre/:genres",
      name: "ByGenre",
      component: ByGenre
    },
    {
      path: "/BestRankedMovies",
      name: "BestRankedMovies",
      component: BestRankedMovies
    },
    {
      path: "/BestRankedSeries",
      name: "BestRankedSeries",
      component: BestRankedSeries
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    }
  ],
});
