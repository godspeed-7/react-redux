import { createSelector, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { apiCallBegan, apiCallFailed, apiCallSuccess } from './api';

let lastId = 0;

const { actions, reducer } = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    bugAdded: (bugs, action) => {
      console.log('state bugs add', bugs);
      bugs.list.push({
        id: _.random(0, 50000),
        description: action.payload.description,
        resolved: false,
      });
    },
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsRequestedFailed: (bugs, action) => {
        bugs.loading = false;
      },
    bugResolved: (bugs, action) => {
      console.log('state bugs', bugs);
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
    },
    bugAssignedToUser: (bugs, action) => {
      const bugId = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[bugId].userId = action.payload.userId;
    },
  },
});

export const loadBugs = () => {
  return apiCallBegan({
    url: '/bugs',
    onSuccess: actions.bugsReceived.type,
    onError: actions.bugsRequestedFailed.type,
    onStart: actions.bugsRequested.type,
  });
};

export const addBug = (bug) => {
    return apiCallBegan({
        url: '/bugs',
        method: "post",
        data: bug,
        onSuccess: actions.bugAdded.type,
        onError: actions.bugsRequestedFailed.type,
        // onStart: actions.bugsRequested.type,  
    })
}

export const assignBugToUser = (data) => {
    return apiCallBegan({
      url: `/bugs/${data.id}`,
        method: "patch",
        data: {userId: data.userId},
        onSuccess: actions.bugAssignedToUser.type,
        onError: actions.bugsRequestedFailed.type,
        // onStart: actions.bugsRequested.type,  
    });
}

export const resolveBug = (id) => {
    return apiCallBegan({
        url: `/bugs/${id}`,
        method: "patch",
        data: {resolved: true},
        onSuccess: actions.bugResolved.type,
        onError: actions.bugsRequestedFailed.type,
        // onStart: actions.bugsRequested.type,  
    });
}

export default reducer;
