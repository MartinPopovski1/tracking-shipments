<template>
<div class="status-history-modal-wrapper">

  <base-modal>
    <template #header>
      <div class="status-history-modal-header">
        <div class="status-history-modal-header-title"> Историја на промена на статуси на адресница </div>
        <div class="status-history-modal-header-close-button" v-on:click="closeModal()">
          <v-icon scale="1.5" name="times"></v-icon>
        </div>
      </div>

    </template>
    <template #body>

      <div class="status-history-modal-body-container">
        <div class="status-history-table-wrapper" >
          <div class="status-history-table-content-wrapper" v-show="!isStatusHistoryTableSpinnerOn">
            <div class="status-history-table-content-header">
              <div class="status-history-table-content-header-cell__extra_small">#</div>
              <div class="status-history-table-content-header-cell__large">Стар статус</div>
              <div class="status-history-table-content-header-cell__large">Датум на промена</div>
              <div class="status-history-table-content-header-cell__large">Нов статус</div>

            </div>
            <div class="status-history-table-content-container scroll-style">
              <div class="status-history-table-content-row-wrapper"
                   v-for="(statusHistoryRow, index) in statusHistoryData"
                   :key="statusHistoryRow.id">

                <div class="status-history-table-content-row">
                  <div class="status-history-table-content-row-cell__extra_small">
                    {{ index }}
                  </div>
                  <div class="status-history-table-content-row-cell__large"> {{statusHistoryRow.starStatus && statusHistoryRow.starStatus.description }}</div>
                  <div class="status-history-table-content-row-cell__large">{{ statusHistoryRow.datumPromena }}</div>
                  <div class="status-history-table-content-row-cell__large">{{ statusHistoryRow.novStatus && statusHistoryRow.novStatus.description}}</div>

                </div>
              </div>
            </div>

            <div class="status-history-table-no-content" v-if="statusHistoryData.length === 0"> Нема податоци за промени на статуси за оваа адресница</div>

          </div>
          <app-spinner :show-spinner="isStatusHistoryTableSpinnerOn" :size="5"/>
        </div>
      </div>

    </template>
    <template #footer>

    </template>
  </base-modal>




</div>
</template>

<script>

import BaseModal from "@/components/modal/BaseModal/BaseModal";
import AppSpinner from "@/components/common/AppSpinner/AppSpinner"
import 'vue-awesome/icons/times';

export default {
  name: "StatusHistoryModal",
  components: {BaseModal, AppSpinner},

  props: {
    statusHistoryData: Array,
  },

  data() {
    return {
      isStatusHistoryTableSpinnerOn: false
    }
  },

  computed: {

  },

  methods: {



    closeModal() {
      this.$emit("closeStatusHistoryModal");
    },




  },

  mounted() {
  },



}
</script>

<style scoped>
@import 'StatusHistoryModal.css';
</style>