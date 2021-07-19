import {ApiGet, ApiPatch, ApiPost} from "../gateway";
import SpecificationMapper from './specification-mapper'



export default{
  getAllPagination(pageSize, pageNumber, showDeleted) {
    let resource = 'specifikacii?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&deleted=' + showDeleted;

    return ApiGet(resource )
        .then(res => SpecificationMapper.mapGetAll(res))
        .catch(function(err) {
      throw (err);
    });
  },
  getAllSearchPagination(searchString, pageSize, pageNumber, showDeleted) {
    let resource = 'specifikacii/search/' + searchString + '?pageSize=' + pageSize + '&pageNumber='
        + pageNumber + '&deleted=' + showDeleted;

    return ApiGet(resource )
        .then(res => SpecificationMapper.mapGetAll(res))
        .catch(function(err) {
      throw (err);
    });
  },

  postSpecificiation(excel) {
    let resource = 'uploadExcel';

    let mappedData = SpecificationMapper.mapPost(excel);
    return ApiPost(resource, mappedData)
        .then(res => res)
        .catch(function(err) {
          throw (err);
        });
  },
  remove(specificationId) {
    let resource = 'specifikacii/' + specificationId + '/delete';

    return ApiPatch(resource)
        .then(res => res)
        .catch(function(err) {
          throw (err);
        });
  }

}
