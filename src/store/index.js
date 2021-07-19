import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './modules/user'




Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
const Store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['user']
    })
  ],
  modules: {
    user,
  }
})


export default function (/* { ssrContext } */) {
  return Store
}

export {
  Store
}
