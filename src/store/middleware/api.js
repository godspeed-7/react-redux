import axios from 'axios';
import { apiCallBegan, apiCallFailed, apiCallSuccess } from '../api';

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);
    const {
      url,
      method = 'GET',
      data = {},
      onSuccess,
      onError,
      onStart,
    } = action.payload;
    try {
      if(onStart) dispatch({
        type: onStart
      });
      next(action);
      const response = await axios.request({
        baseURL: 'http://localhost:3006/',
        url,
        method,
        data,
      });
      dispatch(apiCallSuccess(response.data));
      if(onSuccess) {
        dispatch({
            type: onSuccess,
            payload: response.data,
          });
      }
    } catch (error) {
      dispatch(apiCallFailed(error.messsage));
      if (onError) {
        dispatch({
          type: onError,
          payload: error.messsage,
        });
      }
    }
  };
export default api;
