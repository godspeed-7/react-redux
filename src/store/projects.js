import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

let lastId = 0;
const {actions, reducer} = createSlice({
    name: 'projects',
    initialState: [],
    reducers: ({
        addProject: (projects, action) => {
            projects.push({
                id: ++lastId,
                name: action.payload.name,
            })
        },
        removeProject: (projects , action ) => {
           projects = projects.filter(bug => bug.id !== action.payload.id);
        },
        getProjects: (projects, action) => {

        }
    })
})

export const {addProject, removeProject, getProjects} = actions;
export default reducer;