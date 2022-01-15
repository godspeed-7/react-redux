// import createStore from './custom-store';
import configureStore from './store/index';
import { addBug, loadBugs, bugAssignedToUser, resolveBug, assignBugToUser } from './store/bugs';
import { addProject } from './store/projects';
import { apiCallBegan, apiCallFailed, apiCallSuccess } from './store/api';

export default function CustomRedux() {
  const store = configureStore();
  // store.dispatch(
  //   addBug({
  //     description: 'Bug 1',
  //   })
  // );
  // store.dispatch(addBug({ description: 'Bug 2' }));
  // store.dispatch(addBug({ description: 'Bug 3' }));
  // store.dispatch(bugAssignedToUser({ id: 2, userId: 2 }));
  // store.dispatch(bugResolved({ id: 2 }));

  // store.dispatch(addProject({ name: 'first projects' }));

  // store.dispatch({
  //   type: 'error',
  //   payload: {
  //     messsage: 'Some error occured.',
  //   },
  // });

  // store.dispatch(
  //   apiCallBegan({
  //     url: '/bugs',
  //     onSuccess: 'bugs/bugsReceived',
  //     onError: apiCallFailed.type,
  //   })
  // );
  // store.dispatch(loadBugs());
  // store.dispatch(addBug({description: 'see one'}));
  // setTimeout(() => {
  //   store.dispatch(resolveBug(1))
  //   store.dispatch(assignBugToUser({id: 1, userId: 123}));
  // }, 1000);
  return <div>Hello</div>;
}
