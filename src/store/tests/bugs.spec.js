import { addBug } from '../bugs';
import {apiCallBegan} from '../api'
describe('bugsSlice', () => {
  describe('action creators', () => {
    it('addBug', () => {
      const result = addBug({
        description: 'A real bug',
      });
      const expected = {
          type: apiCallBegan.type,
          payload: {
              url: '/bugs',
              method: 'post',
              data: bug,
              
          }
      }
    });
  });
});
