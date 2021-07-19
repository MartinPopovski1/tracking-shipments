import moment from 'moment'

export default {

    mapGetAll(paginationObject) {
        return {
            pageNumber: paginationObject.PageNumber,
            pageSize: paginationObject.PageSize,
            totalItemCount: paginationObject.TotalItemCount,
            totalPageCount: paginationObject.TotalPageCount,
            pagedList: paginationObject.PagedList.map(specification => this.mapGet(specification))

        };
    },

    mapGet(specification) {
        return {
            id: specification.id.toString(),
            userId: specification.user_id.toString(),
            createdAt: specification.created_at ? moment( specification.created_at ).format( 'DD-MM-YYYY HH:mm') : specification.created_at,
            barcode: specification.barcode,

            /* front end properties */
            adresniciListPerSpecification: null,
            isAdresniciTableOpen: false,
            isOpenSpecificationSpinnerOn: false,
            isPrintSpecificationSpinnerOn: false,
            isPrintAdresniciSpinnerOn: false,
            isSpecificationDeleteSpinnerOn: false,
        }
    },
    mapPost(excel) {
        var formData = new FormData();
        formData.append("Excel", excel);
        return formData;

    }


}