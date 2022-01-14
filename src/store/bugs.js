import {createSelector, createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
import { apiCallBegan, apiCallFailed, apiCallSuccess } from './api';

let lastId = 0;

const {actions, reducer} = createSlice({
    name: 'bugs',
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: ({
        addBug: (bugs, action) => {
            bugs.list.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            })
        },
        bugResolved: (bugs , action ) => {
            const bugId = bugs.list.findIndex(bug => bug.id === action.payload.id);
            bugs.list[bugId].resolved = true;
        },
        bugsReceived: (bugs, action) => {
            bugs.list = action.payload;
        },
        bugAssignedToUser: (bugs, action) => {
            const bugId = bugs.list.findIndex(bug => bug.id === action.payload.id);
            bugs.list[bugId].userId = action.payload.userId;
        }
        
    })
})

export const loadBugs = () => {
    return apiCallBegan({
        url: '/bugs',
        onSuccess: actions.bugsReceived.type,
        onError: apiCallFailed.type,
      })
}

export const {addBug, bugResolved, getBugs, bugAssignedToUser, bugsReceived} = actions;
export default reducer;