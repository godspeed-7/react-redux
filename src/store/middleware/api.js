import axios from 'axios';
import { apiCallBegan, apiCallFailed, apiCallSuccess } from '../api';

// const action = {
//     type: "apiCallBegan",
//     payload: {
//         url: '/bugs',
//         method: "get",
//         data: {},
//         onSuccess: "bugsReceived",
//         onError: "apiRequestFailed"
//     }
// }

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);
    next(action);
    const {
      url,
      method = 'GET',
      data = {},
      onSuccess,
      onError,
    } = action.payload;
    try {
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
      dispatch(apiCallFailed(error));
      if (onError) {
        dispatch({
          type: onError,
          payload: error,
        });
      }
    }
  };
export default api;
