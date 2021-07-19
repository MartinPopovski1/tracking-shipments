import {ApiGet, ApiPatch, ApiPost} from "../gateway";
import AdresniciMapper from './adressnica-mapper'



export default{
  getAll(filter) {
    let resource = 'adresnici/byDate';

    return ApiPost(resource, filter)
        .then(res => AdresniciMapper.mapGetAll(res))
        .catch(function(err) {
      throw (err);
    });
  },

  getAllPagination(pageSize, pageNumber, showDeleted) {
    let resource = 'adresnici?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&deleted=' + showDeleted;

    return ApiGet(resource)
        .then(res => AdresniciMapper.mapGetAllPagination(res))
        .catch(function(err) {
      throw (err);
    });
  },

  getAllPerSpecification(specificationId) {
    let resource = 'specifikacii/' + specificationId + "/adresnici";

    return ApiGet(resource)
        .then(res => AdresniciMapper.mapGetAll(res))
        .catch(function(err) {
      throw (err);
    });
  },

  getAllSearchPagination(searchString, pageSize, pageNumber, showDeleted) {
    let resource = 'adresnici/search/' + searchString + '?pageSize=' + pageSize
        + '&pageNumber=' + pageNumber + '&deleted=' + showDeleted;

    return ApiGet(resource)
        .then(res => AdresniciMapper.mapGetAllPagination(res))
        .catch(function(err) {
      throw (err);
    });
  },

  remove(adresnicaId) {
    let resource = 'adresnici/' + adresnicaId + '/delete';

    return ApiPatch(resource)
        .then(res => res)
        .catch(function(err) {
          throw (err);
        });
  }

}
