import bugsReducer from './bugs';
import projectsReducer from './projects';
import {combineReducers} from 'redux';

export default combineReducers({
    bugs: bugsReducer,
    projects: projectsReducer 
});