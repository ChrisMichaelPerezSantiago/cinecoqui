const types = require('./types.js');

export const mutations = {
  initialiseStore(state) {
    // Check if the ID exists
    if(localStorage.getItem('store')) {
      // Replace the state object with the stored item
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem('store')))
      );
    }
  },
  [types.SET_SERIES](state , payload) {
    state.series = payload;
  },
  [types.SET_MOVIES](state , payload) {
    state.movies = payload;
  },
  [types.SET_SEARCH](state , payload) {
    state.contentSearched = payload;
  },
  [types.SET_EPISODES](state , payload) {
    state.episodes = payload;
  },
  [types.SET_VIDEO_SERIES](state , payload) {
    state.serie_video = payload;
  },
  [types.SET_VIDEO_MOVIES](state , payload){
    state.movie_video = payload;
  },
  [types.SET_GENRES](state , payload){
    state.genres = payload;
  },
  [types.IS_LOADING](state, payload) {
    state.isLoading = payload;
  }
};
