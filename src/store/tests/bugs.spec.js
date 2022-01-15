import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addBug, getUnresolvedBugs, resolveBug } from '../bugs';
import configureStore from '../index';

describe('bugsSlice', () => {
  let fakeAxios;
  let store;
  const bugsSlice = () => store.getState().bugs;
  beforeEach(()=> {
     store = configureStore();
    fakeAxios = new MockAdapter(axios);
  });
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
    expect(bugsSlice().list).toHaveLength(1);
  });

  it("Should mark the bug as resolved if its saved to the server", async ()=> {
    const element = bugsSlice().list[0];
    console.log(element);
    fakeAxios.onPatch(`/bugs/${element.id}`).reply(200, { id:element.id, resolved: true});
    await store.dispatch(resolveBug(element.id));
    expect(bugsSlice().list[0].resolved).toBe(true);
  })
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
