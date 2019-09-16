const axios = require('axios');
const types = require('./types');
const pagin = require('../js/paginator'); 
const URL = require('./urls');


export const actions = {
  GET_SERIES({commit} , page){
    axios.get(`${URL.SERIES}/${page}`)
      .then(doc =>{
        console.log('res: ' , doc);
        const series = doc.data.series;
        commit(types.SET_SERIES , series);
        setTimeout(() =>{
          commit(types.IS_LOADING , false);
        } , 1000);
      }).catch(err =>{
        console.log(err);
    });
  },
  GET_EPISODES({commit} , page){
    axios.get(`${URL.EPISODES}/${page}`)
      .then(doc =>{
        console.log('res: ' , doc);
        const episodes = doc.data.episodes;
        commit(types.SET_EPISODES , episodes);
        setTimeout(() =>{
          commit(types.IS_LOADING , false);
        } , 1000);
      }).catch(err =>{
        console.log(err);
    });
  }, 
  GET_LASTESTS_EPISODES({commit}){
    axios.get(`${URL.LATEST_EPISODE}`)
      .then(doc =>{
        console.log('res: ' , doc);
        const episodes = doc.data.episodes;
        commit(types.SET_LATESTS_EPISODES , episodes);
        setTimeout(() =>{
          commit(types.IS_LOADING , false);
        } , 1000);
      }).catch(err =>{
        console.log(err);
    });
  }, 
  GET_VIDEO_SERIES({commit} , id){
    axios.get(`${URL.VIDEO_SERIES}/${id}`)
      .then(doc =>{
        console.log('res from videos_serie: ' , doc);
        const video_serie = doc.data.video_iframe
        console.log('.... ' , video_serie);
        
        commit(types.SET_VIDEO_SERIES , video_serie);
        setTimeout(() =>{
          commit(types.IS_LOADING , false);
        } , 1000);
      }).catch(err =>{
        console.log(err);
    });
  },
  GET_MOVIES({commit} , page){
    axios.get(`${URL.MOVIES}/${page}`)
      .then(doc =>{      
        const movies = doc.data.movies;
        commit(types.SET_MOVIES , movies);
        setTimeout(() =>{
          commit(types.IS_LOADING , false);
        } , 1000);
      }).catch(err =>{
        console.log(err);
    });
  }, 
  GET_VIDEO_MOVIES({commit} , id){
    axios.get(`${URL.VIDEO_MOVIES}/${id}`)
      .then(doc =>{
        const video_movies = doc.data.video_iframe        
        commit(types.SET_VIDEO_MOVIES , video_movies);
        setTimeout(() =>{
          commit(types.IS_LOADING , false);
        } , 1000);
      }).catch(err =>{
        console.log(err);
    });
  },
  GET_CONTENT_SEARCH({commit} , query){
    axios.get(`${URL.SEARCH}/${query}`)
      .then(doc =>{
        const contents = doc.data.content;
        commit(types.SET_SEARCH , contents);
        setTimeout(() => {
          commit(types.IS_LOADING , false);
        } , 1000);
      }).catch(err =>{
        console.log(err);
      });
  }, 
  GET_GENRES({commit} , info){
    axios.get(`${URL.GENRES}/${info.genre}/${info.page}`)
      .then(doc =>{
        const content = doc.data.content;
        console.log('content ' , content);
        commit(types.SET_GENRES , content);
        setTimeout(() => {
          commit(types.IS_LOADING , false);
        } , 1000);
      }).catch(err =>{
        console.log(err);
      });
  }, 
};
