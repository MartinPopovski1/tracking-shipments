<template>
<div class="are-you-sure-modal-wrapper">

  <base-modal>
    <template #header>
      <div class="are-you-sure-modal-header">
        <div class="are-you-sure-modal-header-title">{{ label }} </div>
        <div class="are-you-sure-modal-header-close-button" v-on:click="closeModalWithoutChanges()">
          <v-icon scale="1.5" name="times"></v-icon>
        </div>
      </div>

    </template>
    <template #body>
      <div class="are-you-sure-modal-body-container">
        {{message}}
      </div>

    </template>
    <template #footer>
      <div class="are-you-sure-modal-action-buttons">
        <app-button custom-class="are-you-sure-modal-cancel-button" v-on:click="closeModalWithoutChanges"> {{noBtnTxt}} </app-button>
        <app-button custom-class="are-you-sure-modal-ok-button" v-on:click="closeModalWithChanges"> {{yesBtnTxt}} </app-button>
      </div>
    </template>
  </base-modal>




</div>
</template>

<script>

import BaseModal from "@/components/modal/BaseModal/BaseModal";
import AppButton from "@/components/common/AppButton/AppButton";
import 'vue-awesome/icons/times';

export default {
  name: "AreYouSureModal",
  components: {BaseModal, AppButton},

  props: {
    label: String,
    message: String,
    yesBtnTxt: String,
    noBtnTxt: String,
    removeObject: {}
  },

  data() {
    return {

    }
  },

  computed: {
  },

  methods: {



    closeModalWithChanges() {
      this.$emit("areYouSurePositiveFeedback");
    },

    closeModalWithoutChanges() {
      this.$emit("areYouSureNegativeFeedback");
    },




  },

  mounted() {

  },



}
</script>

<style scoped>
@import 'AreYouSureModal.css';
</style>