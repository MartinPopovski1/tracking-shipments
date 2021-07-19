<template>
  <div>
    <app-header v-on:logout="logout" v-on:changePassword="goToChangePassword"></app-header>

    <div class="first-page-wrapper" v-if="!pageSpinner">
      <div class="first-page-content-wrapper">
        <div class="first-page-add-icon-wrapper">
          <app-button custom-class="upload-excel-btn">
            <label>
              Прикачи спецификација
              <input type="file" id="file" ref="myFiles"
                     @change="uploadFiles">
            </label>
          </app-button>

        </div>

        <div class="first-page-tabs-wrapper">
          <div class="first-page-tab-wrapper" v-on:click="openSpecificationTab"
               :class="{'first-page-tab-wrapper-active-class' : activeTab === 'specification'}">
            Спецификации
          </div>

          <div class="first-page-tab-wrapper" v-on:click="openAdresniciTab"
               :class="{'first-page-tab-wrapper-active-class' : activeTab === 'adresnici'}">
            Адресници
          </div>
        </div>


        <div class="first-page-filters-container" v-show="activeTab === 'specification'">
          <div class="first-page-search-container">

            <div class="first-page-search-header-wrapper">
              Пребарувај спецификации
            </div>
            <div class="first-page-search-input-wrapper">
              <input v-model="searchSpecificationString" @keyup.enter="searchSpecifications(1)"/>
              <div class="first-page-search-icon-wrapper" v-on:click="searchSpecifications(1)">
                <v-icon name="search"/>
              </div>
            </div>
            <div class="first-page-search-error-message-wrapper"
                 v-if="searchSpecificationErrorMessage">
              Пребарувањето мора да содржи минимум 3 симболи!
            </div>
          </div>

          <div class="first-page-deleted-switch-container">
            <div class="first-page-deleted-switch-label">
              Прикажи избришани спецификации
            </div>
            <div class="first-page-deleted-switch-input">
              <label class="switch">
                <input type="checkbox" v-model="showDeletedSpecifications" @change="getAllSpecifications(1)">
                <span class="slider round"></span>
              </label>
            </div>
          </div>

        </div>

        <div class="first-page-filters-container" v-show="activeTab === 'adresnici'">
          <div class="first-page-search-container">
            <div class="first-page-search-header-wrapper">
              Пребарувај адресници
            </div>
            <div class="first-page-search-input-wrapper">
              <input v-model="searchAdresniciString" @keyup.enter="searchAdresnici(1)"/>
              <div class="first-page-search-icon-wrapper" v-on:click="searchAdresnici(1)">
                <v-icon name="search"/>
              </div>
            </div>
            <div class="first-page-search-error-message-wrapper"
                 v-if="searchAdresniciErrorMessage">
              Пребарувањето мора да содржи минимум 3 симболи!
            </div>
          </div>
          <div class="first-page-deleted-switch-container">
            <div class="first-page-deleted-switch-label">
              Прикажи избришани адресници
            </div>
            <div class="first-page-deleted-switch-input">
              <label class="switch">
                <input type="checkbox" v-model="showDeletedAdresnici" @change="getAllAdresnici(1)">
                <span class="slider round"></span>
              </label>
            </div>
          </div>

          <div class="first-page-export-container">
            <app-button custom-class="first-page-export-button-class"
                        v-on:click="showExportFilterModal = true">
              Превземи адресници
            </app-button>
          </div>
        </div>


        <div class="first-page-specification-table-wrapper" v-if="activeTab === 'specification'">
          <div class="first-page-specification-table-content-wrapper" v-show="!isSpecificationTableSpinnerOn">
            <div class="first-page-specification-table-content-header">
              <div class="first-page-specification-table-content-header-cell__extra_small">#</div>
              <div class="first-page-specification-table-content-header-cell__large">Корисник</div>
              <div class="first-page-specification-table-content-header-cell__small">Баркод</div>
              <div class="first-page-specification-table-content-header-cell__medium">Креирано</div>
              <div class="first-page-specification-table-content-header-cell__large">Спецификација</div>
              <div class="first-page-specification-table-content-header-cell__medium">Адресници</div>
              <div class="first-page-specification-table-content-header-cell__large"></div>
              <div class="first-page-specification-table-content-header-cell__small" v-if="!showDeletedSpecifications"></div>
            </div>
            <div class="first-page-specification-table-content-container scroll-style">
              <div class="first-page-specification-table-content-row-wrapper"
                   v-for="(specification, index) in this.specificationList"
                   :key="specification.id">
                <div class="first-page-specification-table-content-row">
                  <div class="first-page-specification-table-content-row-cell__extra_small">
                    {{ index + 1 + paginatorDifference }}
                  </div>
                  <div class="first-page-specification-table-content-row-cell__large"> {{ user.ime }}</div>
                  <div class="first-page-specification-table-content-row-cell__small">{{ specification.barcode }}</div>
                  <div class="first-page-specification-table-content-row-cell__medium">{{ specification.createdAt}}</div>
                  <div class="first-page-specification-table-content-row-cell__large">
                    <app-button class="first-page-specification-table-td-button-custom-class"
                                v-on:click="printSpecification(specification)">
                      <div v-if="!specification.isPrintSpecificationSpinnerOn">Принтај Спецификација</div>
                      <app-spinner :show-spinner="specification.isPrintSpecificationSpinnerOn"/>
                    </app-button>
                  </div>
                  <div class="first-page-specification-table-content-row-cell__medium">
                    <app-button class="first-page-specification-table-td-button-custom-class"
                                v-on:click="printAdresnici(specification)">
                      <div v-if="!specification.isPrintAdresniciSpinnerOn">Принтај Адресници</div>
                      <app-spinner :show-spinner="specification.isPrintAdresniciSpinnerOn"/>
                    </app-button>
                  </div>
                  <div class="first-page-specification-table-content-row-cell__large">
                    <app-button class="first-page-specification-table-open-specification-button"
                                v-on:click="openAdresniciTable(specification)"
                                v-if="!specification.isAdresniciTableOpen && !specification.isOpenSpecificationSpinnerOn">
                      Отвори спецификација
                    </app-button>
                    <app-spinner :show-spinner="specification.isOpenSpecificationSpinnerOn"/>
                    <app-button class="first-page-specification-table-close-specification-button"
                                v-on:click="specification.isAdresniciTableOpen = false"
                                v-if="specification.isAdresniciTableOpen">
                      Затвори
                    </app-button>
                  </div>
                  <div class="first-page-specification-table-content-row-cell__small" v-if="!showDeletedSpecifications">
                    <app-button class="first-page-specification-table-delete-specification-button"
                                v-on:click="openAreYouSureModalForSpecification(specification)">
                      <div v-if="!specification.isSpecificationDeleteSpinnerOn">Избриши</div>
                      <div> <app-spinner :show-spinner="specification.isSpecificationDeleteSpinnerOn"/> </div>
                    </app-button>
                  </div>


                </div>
                <adresnici-table v-if="specification.isAdresniciTableOpen"
                                 :adresnici-list="specification.adresniciListPerSpecification"
                                 :table-color-grey="true"
                                 :paginator-difference-for-index="paginatorDifference"
                                 :show-deleted-adresnici="showDeletedSpecifications"
                                 v-on:openStatusHistory = "openStatusHistory"
                                 v-on:deleteAdresnica="openAreYouSureModalForAdresnica"
                                 v-on:printAdresnica="printAdresnica"></adresnici-table>
              </div>

              <div v-if="specificationList.length === 0" class="first-page-specification-table-no-content">
                  Не се пронајдени бараните спецификации
              </div>

            </div>
          </div>
          <app-spinner :show-spinner="isSpecificationTableSpinnerOn" :size="5"/>
        </div>

        <div class="first-page-adresnici-table-wrapper" v-if="activeTab === 'adresnici'">


            <adresnici-table :adresnici-list="adresniciList"
                             :paginator-difference-for-index="paginatorDifference"
                             :show-deleted-adresnici="showDeletedAdresnici"
                             v-on:deleteAdresnica="openAreYouSureModalForAdresnica"
                             v-on:printAdresnica="printAdresnica"
                             v-on:openStatusHistory = "openStatusHistory"
                             v-if="!isAdresniciTableSpinnerOn"></adresnici-table>


          <app-spinner :show-spinner="isAdresniciTableSpinnerOn" :size="5"/>
        </div>


        <div class="pagination-wrapper" v-if="paginator.pageSize <= paginator.totalItemCount">
          <paginate
              :page-count="paginator.totalPageCount"
              :page-range="paginator.pageRange"
              :margin-pages="0"
              :first-last-button="true"
              :click-handler="paginatonClickHandler"
              :break-view-class="'pagination-break-text'"
              :prev-class="'pagination-custom-prev-class'"
              :prev-link-class="'pagination-custom-prev-link-class'"
              :next-class="'pagination-custom-next-class'"
              :next-link-class="'pagination-custom-next-link-class'"
              :prev-text="'Претходна'"
              :next-text="'Следна'"
              :last-button-text="'Последна'"
              :first-button-text="'Прва'"
              :active-class="'pagination-custom-active-class'"
              :no-li-surround="true"
              :page-link-class="'pagination-custom-a-class'"
              :container-class="'pagination-custom-container-class'">
          </paginate>
        </div>


      </div>

    </div>

    <div class="page-spinner-wrapper">
      <app-spinner :show-spinner="pageSpinner" :size="5"></app-spinner>
    </div>

    <export-filter-modal v-if="showExportFilterModal"
                         v-on:closeExportFilterModal="showExportFilterModal = false"
                         v-on:exportAdresniciFilter="exportFilterModalHandler"/>

    <are-you-sure-modal v-if="showConfirmationSpecification"
                        label="Избриши спецификација"
                        message="Дали сте сигурни дека сакате да ја избришете спецификацијата?"
                        yes-btn-txt="Избриши"
                        no-btn-txt="Откажи"
                        v-on:areYouSurePositiveFeedback="deleteSpecification"
                        v-on:areYouSureNegativeFeedback=" closeAreYouSureModalForSpecification"/>


    <are-you-sure-modal v-if="showConfirmationAdresnica"
                        label="Избриши адресница"
                        message="Дали сте сигурни дека сакате да ја избришете адресницата?"
                        yes-btn-txt="Избриши"
                        no-btn-txt="Откажи"
                        v-on:areYouSurePositiveFeedback="deleteAdresnica"
                        v-on:areYouSureNegativeFeedback="closeAreYouSureModalForAdresnica"/>


    <status-history-modal v-if="statusHistoryDataObject.isOpen"
                          :status-history-data="statusHistoryDataObject.data"
                          v-on:closeStatusHistoryModal="() => this.statusHistoryDataObject.isOpen = false"/>


  </div>

</template>

<script>
import 'vue-awesome/icons/cog';
import 'vue-awesome/icons/plus-circle';
import 'vue-awesome/icons/search';
import 'vue-awesome/icons/toggle-on';
import AppSpinner from "@/components/common/AppSpinner/AppSpinner";
import AppButton from "@/components/common/AppButton/AppButton";
import AppHeader from "@/components/common/AppHeader/AppHeader";
import AdresniciTable from "@/components/custom/AdresniciTable/AdresniciTable";
import ExportFilterModal from "@/components/modal/ExportFilterModal/ExportFilterModal";
import {RepositoryFactory} from "@/backend/repositories/RepositoryFactory";
import {printSpec} from '@/print/print-specification';
import {mapState, mapActions} from 'vuex';
import {buildPrintAdresnica} from "@/print/print-adresnica";
import XLSX from "xlsx";
import AreYouSureModal from "@/components/modal/AreYouSureModal/AreYouSureModal";
import StatusHistoryModal from "@/components/modal/StatusHistoryModal/StatusHistoryModal";

export default {

  name: "FirstPage",
  components: {StatusHistoryModal, AreYouSureModal, AppHeader, AppSpinner, AppButton, AdresniciTable, ExportFilterModal},

  data() {
    return {
      pageSpinner: true,
      isSpecificationTableSpinnerOn: false,
      isAdresniciTableSpinnerOn: false,
      activeTab: "",
      searchSpecificationString: "",
      searchAdresniciString: "",
      searchSpecificationErrorMessage: false,
      searchAdresniciErrorMessage: false,
      showDeletedSpecifications: false,
      showDeletedAdresnici: false,
      showExportFilterModal: false,
      showConfirmationSpecification: false,
      showConfirmationAdresnica: false,
      specificationList: Array,
      adresnicaToBeRemoved: {},
      specificationToBeRemoved: {},
      adresniciList: [{}],
      statusHistoryDataObject: {
        isOpen: false,
        data: null
      },
      paginator: {
        pageNumber: 1,
        pageSize: 10,
        pageRange: 3,
        totalItemCount: 0,
        totalPageCount: 0
      }
    }
  },

  computed: {
    ...mapState('user', {
      user: state => state.user,
    }),

    paginatorDifference() {
      return (this.paginator.pageNumber - 1) * this.paginator.pageSize;
    }

  },

  methods: {
    ...mapActions('user', [
          'resetCommonState'
        ]
    ),

    openSpecificationTab() {
      if (this.activeTab === "specification") return;
      this.showDeletedSpecifications = false;
      this.searchSpecificationString = "";
      this.activeTab = 'specification';
      this.getAllSpecifications(1);
    },
    openAdresniciTab() {
      if (this.activeTab === "adresnici") return;
      this.showDeletedAdresnici = false;
      this.searchAdresniciString = "";
      this.activeTab = 'adresnici';
      this.getAllAdresnici(1);
    },

    paginatonClickHandler(page) {
      if (this.activeTab === 'specification') {
        if (this.searchSpecificationString) this.searchSpecifications(page)
        else this.getAllSpecifications(page);
      }
      if (this.activeTab === 'adresnici') {
        if (this.searchAdresniciString) this.searchAdresnici(page)
        else this.getAllAdresnici(page);
      }
    },

    openAdresniciTable(specification) {
      specification.isOpenSpecificationSpinnerOn = true;
      RepositoryFactory.get('adresnica').getAllPerSpecification(specification.id).then((res) => {
        specification.adresniciListPerSpecification = res
        specification.isAdresniciTableOpen = true;
        specification.isOpenSpecificationSpinnerOn = false;
      })
    },

    openStatusHistory(adresnica) {
      this.statusHistoryDataObject.isOpen = true;
      this.statusHistoryDataObject.data = adresnica.adresniciStatusHistory;

    },


    logout() {
      this.resetCommonState();
    },

    goToChangePassword() {
      this.$router.push({name:'ChangePassword'});
    },


    uploadFiles() {
      RepositoryFactory.get('specification').postSpecificiation(this.$refs.myFiles.files[0])
          .then(() => {
            this.getAllSpecifications(1);
            this.$toasted.success('Успешно прикачување', {
              theme: "toasted-primary",
              position: "top-right",
              duration: 3000
            })
          })
          .catch((err) => {
            err.response.data.ResultMessages.forEach((error) => {
              this.$toasted.error(error.Message, {
                theme: "toasted-primary",
                position: "top-left",
                duration: 5000
              })
            })
          })
    },




    openAreYouSureModalForSpecification(specification) {
      this.specificationToBeRemoved = specification;
      this.showConfirmationSpecification = true;
    },
    closeAreYouSureModalForSpecification() {
      this.specificationToBeRemoved = null;
      this.showConfirmationSpecification = false;
    },

    openAreYouSureModalForAdresnica(adresnica) {
      this.adresnicaToBeRemoved = adresnica;
      this.showConfirmationAdresnica = true;
    },
    closeAreYouSureModalForAdresnica() {
      this.adresnicaToBeRemoved = null;
      this.showConfirmationAdresnica = false;
    },

    deleteSpecification() {
      if(!this.specificationToBeRemoved || !this.specificationToBeRemoved.id) return;
      this.specificationToBeRemoved.isSpecificationDeleteSpinnerOn = true;
      this.showConfirmationSpecification = false;
      RepositoryFactory.get('specification').remove(this.specificationToBeRemoved.id)
      .then(() => {
        this.specificationToBeRemoved.isSpecificationDeleteSpinnerOn = false;
        this.getAllSpecifications(1);
        this.$toasted.success('Успешно избришано', {
          theme: "toasted-primary",
          position: "top-right",
          duration: 3000
        })
      })
      .catch((err) => {
        this.$toasted.error(err.response.message, {
          theme: "toasted-primary",
          position: "top-center",
          duration: 4000
        })
      })
    },

    deleteAdresnica() {
      if(!this.adresnicaToBeRemoved || !this.adresnicaToBeRemoved.id) return;
      this.showConfirmationAdresnica = false;
      this.adresnicaToBeRemoved.isAdresnicaDeleteSpinnerOn = true;
      RepositoryFactory.get('adresnica').remove(this.adresnicaToBeRemoved.id)
      .then(() => {
        this.adresnicaToBeRemoved.isAdresnicaDeleteSpinnerOn = false;
        if(this.activeTab === 'specification') this.deleteAdresnicaFromAdresnicaListPerSpecification()
        else this.getAllAdresnici(1);
        this.$toasted.success('Успешно избришано', {
          theme: "toasted-primary",
          position: "top-right",
          duration: 3000
        })
      })
      .catch((err) => {
        this.$toasted.error(err.response.message, {
          theme: "toasted-primary",
          position: "top-center",
          duration: 4000
        })
      })
    },



    /* Print functions */

    printSpecification(specification) {
      specification.isPrintSpecificationSpinnerOn = true;
      RepositoryFactory.get('adresnica').getAllPerSpecification(specification.id).then((adresniciList) => {
        printSpec(adresniciList, specification);
        specification.isPrintSpecificationSpinnerOn = false;
      })
    },

    printAdresnici(specification) {
      let koristiGrupniPratki = this.user.koristiGrupniPratki;
      specification.isPrintAdresniciSpinnerOn = true;
      let onLoadScript = "<script type=" + "application/javascript" +
          ">window.onload = function(){window.print(); window.onfocus = function() {setTimeout(function(){window.close()},3);} }" +
          "<" + "/script>";
      let docEnd = "</body></html>";
      let adresniciHTML;
      RepositoryFactory.get('adresnica').getAllPerSpecification(specification.id).then((adresniciList) => {
        adresniciList.forEach((adresnica) => {
          if(koristiGrupniPratki && adresnica.brojNaPaketi > 1) {
            for(let i=1; i<adresnica.brojNaPaketi + 1; i++) {
              console.log(adresnica);
              let oznaka = adresnica.brojNaPaketi + '/' + i;
              let aHTML = buildPrintAdresnica(adresnica, this.user, true, true, oznaka) + '</div>';
              if (!adresniciHTML) adresniciHTML = '<br>' + aHTML + '<br>' + aHTML;
              else adresniciHTML += '<br>' + aHTML + '<br>' + aHTML;
            }
          }
          else {
            let aHTML = buildPrintAdresnica(adresnica, this.user, true, true,"") + '</div>';
            if (!adresniciHTML) adresniciHTML = '<br>' + aHTML + '<br>' + aHTML;
            else adresniciHTML += '<br>' + aHTML + '<br>' + aHTML;
          }

        })
        adresniciHTML += onLoadScript + docEnd;
        let printWindow = window.open();

        printWindow.document.write(adresniciHTML);

        printWindow.document.close();
        specification.isPrintAdresniciSpinnerOn = false;
      })
    },

    printAdresnica(adresnica) {
      let koristiGrupniPratki = this.user.koristiGrupniPratki;
      adresnica.isPrintAdresniciSpinnerOn = true;

      let onLoadScript = "<script type=" + "application/javascript" +
          ">window.onload = function(){window.print(); window.onfocus = function() {setTimeout(function(){window.close()},3);} }" +
          "<" + "/script>";

      let docEnd = "</body></html>";
      let adresniciHTML;
      if(koristiGrupniPratki && adresnica.brojNaPaketi > 1) {
        for(let i=1; i<adresnica.brojNaPaketi + 1; i++) {
          let oznaka = adresnica.brojNaPaketi + '/' + i;
          let aHTML = buildPrintAdresnica(adresnica, this.user, true, true, oznaka) + '</div>';
          if (!adresniciHTML) adresniciHTML = '<br>' + aHTML + '<br>' + aHTML;
          else adresniciHTML += '<br>' + aHTML + '<br>' + aHTML;
        }
      }
      else {
        let aHTML = buildPrintAdresnica(adresnica, this.user, true, true, "") + '</div>';
        adresniciHTML = '<br>' + aHTML + '<br>' + aHTML;
      }



      adresniciHTML += onLoadScript + docEnd;
      let printWindow = window.open();
      printWindow.document.write(adresniciHTML);
      printWindow.document.close();
      adresnica.isPrintAdresniciSpinnerOn = false;

    },

    /* export functions */

    exportFilterModalHandler(exportDateFilter) {
      RepositoryFactory.get('adresnica').getAll(exportDateFilter)
          .then((res) => {
            this.showExportFilterModal = false;
            if(res.length !== 0)  this.exportAdresnici(res);
            else this.$toasted.error("Не постојат адресници за избраниот временски период!", {
              theme: "toasted-primary",
              position: "top-center",
              duration: 5000
            })
          })
    },

    exportAdresnici(adresnici) {
      var wb = XLSX.utils.book_new();
      wb.Props = {
        Title: "Adresnici",
        Subject: "Adresnici",
        Author: "TPL",
        CreatedDate: new Date()
      };
      wb.SheetNames.push("adresnici");
      var ws_data = this.constructXlsDocData(adresnici);
      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      var wscols = [
        {wch:10}, {wch:12}, {wch:20}, {wch:21}, {wch:14}, {wch:14}, {wch:8}, {wch:15}, {wch:15}, {wch:10}, {wch:14},
        {wch:15}, {wch:12},{wch:21},{wch:21},
      ];
      ws['!cols'] = wscols;
      wb.Sheets["adresnici"] = ws;
      XLSX.writeFile(wb, "adresnici.xlsx");
    },

    constructXlsDocData(data) {
      let result = [];
      // table header
      var reportHeaders = ["Статус", "Сериски број", "Име на примач", "Адреса на примач", "Место на примач", "Телефон на примач", "Тежина",
        "Повратен откуп", "Повратен документ", "Поштарина", "Забелешка", "Означена вредност", "Откупнина", "Датум на процесирање", "Датум на доставување" ];
      if(data[0].pratkaBroj || data[0].pratkaBroj === "") reportHeaders.push("Пратка број");
      if(data[0].otpremnica || data[0].otpremnica === "" || data[0].identifikaciskiBroj || data[0].identifikaciskiBroj === ""
          || data[0].prodazenKanal || data[0].prodazenKanal === "" || data[0].dogovor || data[0].dogovor === "" ) {
        reportHeaders = reportHeaders.concat(["Отпремница", "Идентификациски број", "Продажен канал", "Интерна забелешка", "Договор"]);
      }
      result.push(reportHeaders);
      // table data
      data.forEach(function (item) {
        let row = [item.status.description, item.seriskiBroj, item.imeNaPrimac, item.adresaNaPrimac, item.mestoNaPrimac,
          item.telefonNaPrimac, item.tezina, item.povratenOtkup, item.povratenDokument, item.postarina,item.zabeleska,
          item.oznacenaVrednost, item.otkupnina, item.datumProcesirana, item.datumDostavena]
        if(item.pratkaBroj || item.pratkaBroj === "") row.push(item.pratkaBroj);
        if(data[0].otpremnica || data[0].otpremnica === "" || data[0].identifikaciskiBroj === "" || data[0].identifikaciskiBroj
            || data[0].prodazenKanal || data[0].prodazenKanal === "" || data[0].dogovor || data[0].dogovor === "" ) {
          row = row.concat([item.otpremnica, item.identifikaciskiBroj, item.prodazenKanal, item.internaZabeleska, item.dogovor])
        }
        result.push(row);
      });

      // total row
      let totalRow = ["Вкупно", "", "", "", "", "", this.calculateTotal(data, "tezina", false), this.calculateTotal(data, "povratenOtkup", false),
        "", this.calculateTotal(data, "postarina", false),"","", this.calculateTotal(data, "otkupnina", false) ]
      if(result.pratkaBroj) totalRow.push("");
      if(data[0].otpremnica || data[0].identifikaciskiBroj || data[0].prodazenKanal || data[0].dogovor ) {
        totalRow = totalRow.concat(["", "", "", "", ""])
      }
      result.push(totalRow);

      return result;
    },

    /* initialization */

    async initPage() {
      await this.openSpecificationTab();
      this.pageSpinner = false;

    },

    searchSpecifications(page) {
      if (this.searchSpecificationString.length < 3 && this.searchSpecificationString !== "") {
        this.searchSpecificationErrorMessage = true;
        return;
      }
      this.searchSpecificationErrorMessage = false;
      this.isSpecificationTableSpinnerOn = true;
      if (!this.searchSpecificationString) {
        this.getAllSpecifications(1);
        return;
      }
      RepositoryFactory.get('specification')
          .getAllSearchPagination(this.searchSpecificationString, this.paginator.pageSize, page, this.showDeletedSpecifications)
          .then((paginationObject) => {
            this.isSpecificationTableSpinnerOn = false;
            this.specificationList = paginationObject.pagedList;
            this.updatePaginator(paginationObject)
          })
    },
    searchAdresnici(page) {
      if (this.searchAdresniciString.length < 3 && this.searchAdresniciString !== "") {
        this.searchAdresniciErrorMessage = true;
        return;
      }
      this.searchAdresniciErrorMessage = false;
      this.isAdresniciTableSpinnerOn = true;
      if (!this.searchAdresniciString) {
        this.getAllAdresnici(1);
        return;
      }
      RepositoryFactory.get('adresnica')
          .getAllSearchPagination(this.searchAdresniciString, this.paginator.pageSize, page, this.showDeletedAdresnici)
          .then((paginationObject) => {
            this.isAdresniciTableSpinnerOn = false;
            this.adresniciList = paginationObject.pagedList;
            this.updatePaginator(paginationObject)

          })
    },

    getAllAdresnici(page) {
      this.isAdresniciTableSpinnerOn = true;
      RepositoryFactory.get('adresnica').getAllPagination(this.paginator.pageSize, page, this.showDeletedAdresnici)
          .then((paginationObject) => {
            this.isAdresniciTableSpinnerOn = false;
            this.adresniciList = paginationObject.pagedList;
            this.updatePaginator(paginationObject)
          })
    },

    getAllSpecifications(page) {
      this.isSpecificationTableSpinnerOn = true;
      RepositoryFactory.get('specification').getAllPagination(this.paginator.pageSize, page, this.showDeletedSpecifications)
          .then((paginationObject) => {
            this.isSpecificationTableSpinnerOn = false;
            this.specificationList = paginationObject.pagedList;
            this.updatePaginator(paginationObject)

          })
    },


    /* helpers */

    deleteAdresnicaFromAdresnicaListPerSpecification() {
      let specificationWithRemovedAdresnica = this.specificationList.find((specification) => specification.id === this.adresnicaToBeRemoved.specId)
      let indexOfDeletedAdrenica = specificationWithRemovedAdresnica.adresniciListPerSpecification.indexOf(this.adresnicaToBeRemoved)
      specificationWithRemovedAdresnica.adresniciListPerSpecification.splice(indexOfDeletedAdrenica, 1)
      if(specificationWithRemovedAdresnica.adresniciListPerSpecification.length === 0) this.getAllSpecifications(1);
    },

    updatePaginator(paginationObject) {
      this.paginator.pageSize = paginationObject.pageSize;
      this.paginator.totalItemCount = paginationObject.totalItemCount;
      this.paginator.totalPageCount = paginationObject.totalPageCount;
      this.paginator.pageNumber = paginationObject.pageNumber;
    },

    calculateTotal(data, property) {
      let total = data.reduce((total, item) => {
        return total + parseFloat(item[property]);
    }, 0)
      return total;
    },


  },

  mounted() {
    this.initPage();

  }
}
</script>

<style scoped>
@import "./FirstPage.css";
</style>