import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store.js';
import { plugin } from 'vue-function-api';
import hooks from '@u3u/vue-hooks';
import BootstrapVue from 'bootstrap-vue';
import Paginate from 'vuejs-paginate'


require('./assets/css/style.css');
require('./assets/css/notfound.css');
require('./assets/css/latestlist.css');

Vue.config.productionTip = false;

Vue.use(hooks);
Vue.use(plugin);
Vue.use(BootstrapVue);

Vue.component('paginate' , Paginate);


new Vue({
  router,
  store,
  beforeCreate(){
    this.$store.commit('initialiseStore');
  },
  render: h => h(App),
}).$mount('#app');
