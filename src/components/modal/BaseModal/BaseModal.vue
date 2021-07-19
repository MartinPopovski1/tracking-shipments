<template>
  <div>
    <div class="base-modal-mask" v-on:click="propagateClick">
    <div class="base-modal" >
      <div  class="base-modal-content">
        <div class="base-modal-header">
          <slot name="header" />
        </div>

        <div class="base-modal-body">
          <slot name="body" />
        </div>

        <div class="base-modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
    </div>
  </div>



</template>
<script>
export default {
  name: 'BaseModal',

  methods: {
    propagateClick() {
      this.$emit('clickedOutsideOfModal')
    },

    turnOffScrollUnderOverlay() {
      document.body.style.position = 'fixed';
    },
    turnOnScrollUnderOverlay() {
      document.body.style.position = '';
    }
  },
  mounted() {
    this.turnOffScrollUnderOverlay();
  },
  destroyed() {
    this.turnOnScrollUnderOverlay()
  }

};
</script>
<style>
@import './BaseModal.css';
</style>