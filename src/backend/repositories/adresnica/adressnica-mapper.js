
import {getAdresnicaStatusTypeByKey} from '@/backend/enums/adresnica-status-type.enum'
import moment from "moment";
import {getPaymentByKey} from "@/backend/enums/payment.enum";

export default {

    mapGetAll(adresniciList) {
        return adresniciList.map(adresnica => this.mapGet(adresnica))
    },

    mapGetAllPagination(paginationObject) {
        return {
            pageNumber: paginationObject.PageNumber,
            pageSize: paginationObject.PageSize,
            totalItemCount: paginationObject.TotalItemCount,
            totalPageCount: paginationObject.TotalPageCount,
            pagedList: paginationObject.PagedList.map(adresnica => this.mapGet(adresnica))

        };
    },

    mapGet(adresnica) {
        return {
            id: adresnica.id.toString(),
            specId: adresnica.spec_id.toString(),
            status: (adresnica.status || adresnica.status === 0) ? getAdresnicaStatusTypeByKey(adresnica.status) : {},
            seriskiBroj: adresnica.seriski_broj,
            imeNaPrimac: adresnica.ime_na_primac,
            adresaNaPrimac: adresnica.adresa_na_primac,
            mestoNaPrimac: adresnica.mesto_na_primac,
            telefonNaPrimac: adresnica.telefon_na_primac,
            tezina: adresnica.tezina,
            povratenOtkup: adresnica.povraten_otkup,
            povratenDokument: adresnica.povraten_dokument,
            postarina: adresnica.postarina,
            zabeleska: adresnica.zabeleska,
            oznacenaVrednost: adresnica.oznacena_vrednost,
            otkupnina: adresnica.otkupnina,
            broj_na_paketi: adresnica.broj_na_paketi,
            broj_na_pisma: adresnica.broj_na_pisma,

            postarina_plakja: adresnica.postarina_plakja ? getPaymentByKey(adresnica.postarina_plakja) : null,
            oznacena_vrednost_plakja: adresnica.oznacena_vrednost_plakja ? getPaymentByKey(adresnica.oznacena_vrednost_plakja) : null,
            provizija_plakja: adresnica.provizija_plakja ? getPaymentByKey(adresnica.provizija_plakja) : null,
            povraten_dokument_plakja: adresnica.povraten_dokument_plakja ? getPaymentByKey(adresnica.povraten_dokument_plakja) : null,

            adresniciStatusHistory: adresnica.adresnici_status_history ? adresnica.adresnici_status_history.map((statusHistory) => this.mapGetStatusHistory(statusHistory)) : null,

            datumDostavena: adresnica.datum_dostavena && adresnica.datum_dostavena!== '0001-01-01T00:00:00' ? moment(adresnica.datum_dostavena).format( 'DD-MM-YYYY HH:mm') : null,
            datumProcesirana: adresnica.datum_procesirana && adresnica.datum_procesirana!== '0001-01-01T00:00:00' ? moment(adresnica.datum_procesirana).format( 'DD-MM-YYYY HH:mm') : null,


            brojNaPaketi: adresnica.broj_na_paketi,

            /* Pro credit */
            pratkaBroj: adresnica.pratka_broj,
            /* A1 */
            otpremnica: adresnica.otpremnica,
            identifikaciskiBroj: adresnica.identifikaciski_broj,
            internaZabeleska: adresnica.interna_zabeleska,
            prodazenKanal: adresnica.prodazen_kanal,
            dogovor: adresnica.dogovor,


            /* front end properties */
            isPrintAdresniciSpinnerOn: false,
            isAdresnicaDeleteSpinnerOn: false,
        }
    },

    mapGetStatusHistory(statusHistory) {
      return {
          id: statusHistory.id,
          adresnicaId: statusHistory.adresnica_id ,
          datumPromena: statusHistory.datum_promena ? moment( statusHistory.datum_promena ).format( 'DD-MM-YYYY HH:mm') : statusHistory.datum_promena,
          novStatus: (statusHistory.nov_status || statusHistory.nov_status === 0) ? getAdresnicaStatusTypeByKey(statusHistory.nov_status) : {},
          starStatus: (statusHistory.star_status || statusHistory.star_status === 0) ? getAdresnicaStatusTypeByKey(statusHistory.star_status) : {},
      }

    }



}
