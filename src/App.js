// import createStore from './custom-store';
import store from './store/index';
import { addBug, bugResolved, getBugs, bugAssignedToUser } from './store/bugs';
import { addProject } from './store/projects';

export default function CustomRedux() {
  store.dispatch(addBug({ description: 'Bug 1' }));
  store.dispatch(addBug({ description: 'Bug 2' }));
  store.dispatch(addBug({ description: 'Bug 3' }));
  store.dispatch(bugAssignedToUser({ id: 2, userId: 2 }));
  store.dispatch(bugResolved({ id: 2 }));

  store.dispatch(addProject({ name: 'first projects' }));
  console.log(store.getState());
  return <div>Hello</div>;
}
