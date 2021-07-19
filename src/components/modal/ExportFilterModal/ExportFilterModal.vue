<template>
<div class="export-filter-modal-wrapper">

  <base-modal>
    <template #header>
      <div class="export-filter-modal-header">
        <div class="export-filter-modal-header-title"> Преземи адресници </div>
        <div class="export-filter-modal-header-close-button" v-on:click="closeModalWithoutChanges()">
          <v-icon scale="1.5" name="times"></v-icon>
        </div>
      </div>

    </template>
    <template #body>
      <div class="export-filter-modal-body-container">
        <div class="export-filter-modal-datepicker-label-wrapper">
        Датум од
        </div>
        <div class="export-filter-modal-datepicker-wrapper">
          <input type="date"  v-model="dateFrom" @change="changeDateTo"/>
        </div>
        <div class="export-filter-modal-datepicker-label-wrapper">
        Датум до
        </div>
        <div class="export-filter-modal-datepicker-wrapper">
          <input type="date"  v-model="dateTo" />
        </div>

        <div class="export-filter-modal-datepicker-error-message-container" v-if="showErrorMessage">
          Внесете ги потребните податоци!
        </div>
      </div>

    </template>
    <template #footer>
      <div class="export-filter-modal-action-buttons">
        <app-button custom-class="export-filter-modal-cancel-button" v-on:click="closeModalWithoutChanges"> Откажи </app-button>
        <app-button custom-class="export-filter-modal-ok-button" v-on:click="closeModalWithChanges"> Ок </app-button>
      </div>
    </template>
  </base-modal>




</div>
</template>

<script>

import BaseModal from "@/components/modal/BaseModal/BaseModal";
import AppButton from "@/components/common/AppButton/AppButton";
import 'vue-awesome/icons/times';
import moment from 'moment'

export default {
  name: "ExportFilterModal",
  components: {BaseModal, AppButton},

  data() {
    return {
      dateFrom: "",
      dateTo: "",
      showErrorMessage: false
    }
  },

  computed: {
/*
    maxDateAvailable() {
      let now = moment(new Date()).format("YYYY-MM-DD");
      if (Math.abs(moment(this.dateFrom).diff(now, 'months', true)) > 1) {
        return moment(this.dateFrom).add(1, 'M').format('YYYY-MM-DD');
      }
      else return moment(Date.now()).format("YYYY-MM-DD")
    }
*/


  },

  methods: {

    changeDateTo() {
/*      let now = moment(new Date()).format("YYYY-MM-DD")

      if(Math.abs(moment(this.dateFrom).diff(now, 'months', true)) > 1) {
        this.dateTo = moment(this.dateFrom).add(1, 'M').format('YYYY-MM-DD');
      }*/

    },

    closeModalWithChanges() {
      if(!this.dateFrom || !this.dateTo) {
        this.showErrorMessage = true;
        return;
      }
      let filterDateObject = {
        datumOd: moment(this.dateFrom).format('YYYY-MM-DD'),
        datumDo: moment(this.dateTo).format('YYYY-MM-DD')
      }

      this.$emit("exportAdresniciFilter", filterDateObject );
    },

    closeModalWithoutChanges() {
      this.$emit("closeExportFilterModal");
    },




  },

  mounted() {
  },



}
</script>

<style scoped>
@import 'ExportFilterModal.css';
</style>