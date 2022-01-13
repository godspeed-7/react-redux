import {configureStore} from '@reduxjs/toolkit';
import bugsReducer from './bugs';
import projects from './projects';

const reducer = {
bugsReducer,
projects
}

const store = configureStore({reducer});
export default store;