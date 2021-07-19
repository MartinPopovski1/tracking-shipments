import Vue from 'vue'
import App from './App.vue';
import store from '@/store'

import router from './router';
import Icon from 'vue-awesome/components/Icon';
import VueMoment from 'vue-moment';
import moment from 'moment';
import Paginate from 'vuejs-paginate'
import Toasted from 'vue-toasted'


Vue.config.productionTip = false

Vue.component('paginate', Paginate)
Vue.component('v-icon', Icon)
Vue.use(VueMoment, {
  moment
})
Vue.use(Toasted);


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
