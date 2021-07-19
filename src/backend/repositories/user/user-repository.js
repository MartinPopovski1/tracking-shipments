import { ApiPost, ApiPatch } from "../gateway";
import UserMapper from './user-mapper'



export default{

  login(data) {
    let resource = 'login';

    return ApiPost(resource, data)
        .then(user => UserMapper.mapGet(user))
        .catch(function(err) {
      throw (err);
    });
  },

  changePassword(data) {
    let resource = 'changePassword';

    return ApiPatch(resource, data)
        .then(res => res)
        .catch(function(err) {
      throw (err);
    });
  },



}
