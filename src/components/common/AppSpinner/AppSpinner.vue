<template>
  <div class="app-spinner-wrapper" v-if="this.showSpinner">
    <v-icon v-bind:scale="size" name="spinner" spin/>
  </div>
</template>

<script>
import 'vue-awesome/icons/spinner';

export default {
  name: "AppSpinner",

  props: {
    showSpinner: Boolean,
    size: Number,
  },

  mounted() {
  }

}
</script>

<style scoped>
@import 'AppSpinner.css';
</style>