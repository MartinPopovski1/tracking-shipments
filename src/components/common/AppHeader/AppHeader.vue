<template>
<div class="app-header-wrapper">
  <div class="app-header-logo-wrapper" >
    <img src="logo.jpg" alt="Can not load img" crossorigin="anonymous"/>
  </div>
  <div class="app-header-user-info-wrapper" v-if="!hideLogoutBtn">
    <div class="app-header-user-change-password-wrapper" v-on:click="$emit('changePassword')">
      Смени лозинка
    </div>
    <div class="app-header-user-logout-wrapper" v-on:click="$emit('logout')">
      Одјави се
    </div>
    <div class="app-header-user-icon-wrapper">
      <v-icon name="user-circle" scale="1.7"/>
    </div>
  </div>
</div>
</template>

<script>
import 'vue-awesome/icons/user-circle'

export default {
  name: 'AppHeader',

  props: {
    hideLogoutBtn: Boolean
  },


  data() {
    return {
    }
  },


  computed: {
  },
  methods: {
  },

  mounted() {
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "AppHeader.css";
</style>
