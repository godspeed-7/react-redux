import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addBug, getUnresolvedBugs } from '../bugs';
import configureStore from '../index';

describe('bugsSlice', () => {
  let fakeAxios;
  let store;
  beforeEach(()=> {
    store = {};
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().bugs;
  it('should add the bug to the store if its saved to the server', async () => {
    const bug = { description: 'a' };
    const savedBug = {...bug, id: 1};
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toHaveLength(1);
  });
  
  it('should not add the bug to the store if its not saved to the server', async () => {
    const bug = { description: 'b' };
    const savedBug = {...bug, id: 1};
    fakeAxios.onPost("/bugs").reply(500);

     await store.dispatch(addBug(bug));
    console.log(store.getState().bugs);
    expect(bugsSlice().list).toHaveLength(1);
  });
});

describe("Selectors", () => {
  it("UnresolvedBugs", () => {
    const list = [
      {"id": "1", resolved: true},
      {"id": "2", resolved: false},
      {"id": "3", resolved: true},
    ]
    const unresolved = getUnresolvedBugs(list);
    expect(unresolved).toHaveLength(1);
  })
})
