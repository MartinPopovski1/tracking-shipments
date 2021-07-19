<template>
  <div class="adresnici-table-container" :class="{'adresnici-table-grey-color' : tableColorGrey}">


    <div class="adresnici-table-scroll-container" :class="{'adresnici-table-grey-color' : tableColorGrey}">
      <div class="adresnici-table-header" :class="{'adresnici-table-grey-color' : tableColorGrey}">
        <div class="adresnici-table-header-cell__index">#</div>
        <div class="adresnici-table-header-cell__medium">Статус</div>
        <div class="adresnici-table-header-cell__small">Сериски број</div>
        <div class="adresnici-table-header-cell__medium">Име на примач</div>
        <div class="adresnici-table-header-cell__medium">Адреса на примач</div>
        <div class="adresnici-table-header-cell__medium">Место на примач</div>
        <div class="adresnici-table-header-cell__small">Телефон на примач</div>
        <div class="adresnici-table-header-cell__small">Тежина</div>
        <div class="adresnici-table-header-cell__small">Повратен откуп</div>
        <div class="adresnici-table-header-cell__small">Повратен документ</div>
        <div class="adresnici-table-header-cell__small">Поштарина</div>
        <div class="adresnici-table-header-cell__medium">Забелешка</div>
        <div class="adresnici-table-header-cell__medium">Означена вредност</div>
        <div class="adresnici-table-header-cell__medium">Откупнина</div>

        <!-- Pro credit -->
        <div class="adresnici-table-header-cell__small_optional" v-show="adresniciList[0] && (adresniciList[0].pratkaBroj || adresniciList[0].pratkaBroj === '')">
          Пратка број
        </div>

        <!-- A1 -->
        <div class="adresnici-table-header-cell__medium_optional" v-show="adresniciList[0] && (adresniciList[0].otpremnica || adresniciList[0].otpremnica === '')">
          Отпремница
        </div>
        <div class="adresnici-table-header-cell__medium_optional" v-show="adresniciList[0] && (adresniciList[0].identifikaciskiBroj || adresniciList[0].identifikaciskiBroj === '')">
          Идентификациски број
        </div>
        <div class="adresnici-table-header-cell__medium_optional" v-show="adresniciList[0] &&  (adresniciList[0].internaZabeleska || adresniciList[0].internaZabeleska === '')">
          Интерна забелешка
        </div>
        <div class="adresnici-table-header-cell__medium_optional" v-show="adresniciList[0] && (adresniciList[0].prodazenKanal || adresniciList[0].prodazenKanal === '')">
          Продажен канал
        </div>
        <div class="adresnici-table-header-cell__medium_optional" v-show="adresniciList[0] &&  (adresniciList[0].dogovor || adresniciList[0].dogovor === '')">
          Договор
        </div>
        <div class="adresnici-table-header-cell__medium_optional" v-show="adresniciList[0] &&  (adresniciList[0].broj_na_paketi || adresniciList[0].broj_na_paketi === '')">
          Број на пакети
        </div>

      </div>

      <div class="adresnici-table-no-content" v-if="adresniciList.length === 0">
        Не се пронајдени бараните адресници
      </div>

      <div class="adresnici-table-row-wrapper" v-for="(adresnica, index) in adresniciList" :key="adresnica.id">
        <!-- v-for-->
        <div class="adresnici-table-row">
          <div class="adresnici-table-row-cell__index">{{ index + 1 + paginatorDifferenceForIndex }}</div>

          <div class="adresnici-table-row-cell__medium" :title="adresnica.status.description" v-if="adresnica.status">
            <div class="adresnici-table-status-description">
              <v-icon name="circle" :style="{'color' : adresnica.status.color}"/>
              <div>{{adresnica.status.description}}</div>
            </div>

          </div>
          <div class="adresnici-table-row-cell__small">{{adresnica.seriskiBroj}}</div>
          <div class="adresnici-table-row-cell__medium">{{adresnica.imeNaPrimac}}</div>
          <div class="adresnici-table-row-cell__medium"> {{adresnica.adresaNaPrimac}}</div>
          <div class="adresnici-table-row-cell__medium">{{adresnica.mestoNaPrimac}}</div>
          <div class="adresnici-table-row-cell__small">{{adresnica.telefonNaPrimac}}</div>
          <div class="adresnici-table-row-cell__small">{{adresnica.tezina}}</div>
          <div class="adresnici-table-row-cell__small">{{adresnica.povratenOtkup}}</div>
          <div class="adresnici-table-row-cell__small">{{adresnica.povratenDokument}}</div>
          <div class="adresnici-table-row-cell__small">{{adresnica.postarina}}</div>
          <div class="adresnici-table-row-cell__medium">{{adresnica.zabeleska}}</div>
          <div class="adresnici-table-row-cell__medium">{{adresnica.oznacenaVrednost}}</div>
          <div class="adresnici-table-row-cell__medium">{{adresnica.otkupnina}}</div>


          <!-- Pro credit -->
          <div class="adresnici-table-row-cell__small_optional"
               v-show="adresniciList[0] && (adresniciList[0].pratkaBroj || adresniciList[0].pratkaBroj === '') " >
            {{adresnica.pratkaBroj}}
          </div>

          <!-- А1 -->
          <div class="adresnici-table-row-cell__medium_optional"
               v-show="adresniciList[0] && (adresniciList[0].otpremnica || adresniciList[0].otpremnica === '')">
            {{ adresnica.otpremnica }}
          </div>
          <div class="adresnici-table-row-cell__medium_optional"
               v-show="adresniciList[0] && (adresniciList[0].identifikaciskiBroj || adresniciList[0].identifikaciskiBroj === '')">
            {{ adresnica.identifikaciskiBroj }}
          </div>
          <div class="adresnici-table-row-cell__medium_optional"
               v-show="adresniciList[0] && (adresniciList[0].internaZabeleska || adresniciList[0].internaZabeleska === '')">
            {{ adresnica.internaZabeleska }}
          </div>
          <div class="adresnici-table-row-cell__medium_optional"
               v-show="adresniciList[0] && (adresniciList[0].prodazenKanal || adresniciList[0].prodazenKanal === '')">
            {{ adresnica.prodazenKanal }}
          </div>
          <div class="adresnici-table-row-cell__medium_optional"
               v-show="adresniciList[0] && (adresniciList[0].dogovor || adresniciList[0].dogovor === '')">
            {{ adresnica.dogovor }}
          </div>
          <div class="adresnici-table-row-cell__medium_optional"
               v-show="adresniciList[0] && (adresniciList[0].broj_na_paketi || adresniciList[0].broj_na_paketi === '')">
            {{ adresnica.broj_na_paketi }}
          </div>
        </div>

      </div>

    </div>

    <div class="adresnici-table-buttons-wrapper" :class="{'adresnici-table-grey-color' : tableColorGrey}">

      <div class="adresnici-table-history-btn-wrapper">
        <div class="adresnici-table-header-cell__history_btn" ></div>
        <div class="adresnici-table-row-cell__history_btn"
             v-for="adresnica in adresniciList" :key="adresnica.id">
          <app-button class="adresnici-table-td-button-custom-class"
                      v-on:click="$emit('openStatusHistory', adresnica)">
            <div v-if="!adresnica.isPrintAdresniciSpinnerOn"> Историја </div>
            <app-spinner :show-spinner="adresnica.isPrintAdresniciSpinnerOn"/>
          </app-button>
        </div>
      </div>
      <div class="adresnici-table-print-btn-wrapper">
        <div class="adresnici-table-header-cell__print_btn" ></div>
        <div class="adresnici-table-row-cell__print_btn"
             v-for="adresnica in adresniciList" :key="adresnica.id">
          <app-button class="adresnici-table-td-button-custom-class"
                      v-on:click="$emit('printAdresnica', adresnica)">
            <div v-if="!adresnica.isPrintAdresniciSpinnerOn"> Принтај Адресницa </div>
            <app-spinner :show-spinner="adresnica.isPrintAdresniciSpinnerOn"/>
          </app-button>
        </div>
      </div>
      <div class="adresnici-table-delete-btn-wrapper" v-if="!showDeletedAdresnici">
        <div class="adresnici-table-header-cell__delete_btn"></div>

        <div class="adresnici-table-row-cell__delete_btn"
             v-for="adresnica in adresniciList" :key="adresnica.id">
          <app-button class="adresnici-table-td-delete-button-custom-class"
                      v-on:click="$emit('deleteAdresnica', adresnica)">
            <div v-if="!adresnica.isAdresnicaDeleteSpinnerOn"> Избриши </div>
            <app-spinner :show-spinner="adresnica.isAdresnicaDeleteSpinnerOn"/>
          </app-button>
        </div>
      </div>

    </div>



  </div>
</template>
<script>
import AppButton from "@/components/common/AppButton/AppButton";
import AppSpinner from "@/components/common/AppSpinner/AppSpinner";
import 'vue-awesome/icons/circle';

export default {

  name: "AdresniciTable",

  components: {AppSpinner, AppButton},

  props: {
    adresniciList: Array,
    paginatorDifferenceForIndex: Number,
    tableColorGrey: Boolean,
    showDeletedAdresnici: Boolean
  },

  computed: {

  },

  methods: {


  },
  mounted() {
  }
}
</script>

<style scoped>
@import 'AdresniciTable.css';
</style>