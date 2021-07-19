import Vue from "vue";
import Router from "vue-router";

import FirstPage from '../pages/FirstPage/FirstPage.vue'
import ChangePassword from "@/pages/ChangePassword/ChangePassword";

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: 'FirstPage', component: FirstPage },
    { path: '/change-password', name: 'ChangePassword', component: ChangePassword },
  ],
});