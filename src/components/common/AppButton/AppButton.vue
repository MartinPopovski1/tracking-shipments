<template>
  <button :class="customClass"
          :disabled="disabled"
          @click="callback($event)">
    <slot></slot>
  </button>
</template>
<script>
export default {

  name: "AppButton",

  props: {
    customClass: String,
    disabled: Boolean
  },
  methods: {
    callback: function(e) {
      this.$emit('click', e);
    }
  }
}
</script>

<style scoped>
@import 'AppButton.css';
</style>