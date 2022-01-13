import {createSelector, createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

let lastId = 0;
const {actions, reducer} = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: ({
        addBug: (bugs, action) => {
            bugs.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            })
        },
        bugResolved: (bugs , action ) => {
            const bugId = bugs.findIndex(bug => bug.id === action.payload.id);
            bugs[bugId].resolved = true;
        },
        getBugs: (bugs, action) => {

        },
        bugAssignedToUser: (bugs, action) => {
            const bugId = bugs.findIndex(bug => bug.id === action.payload.id);
            bugs[bugId].userId = action.payload.userId;
        }
        
    })
})

export const getBugsByUser = userId => 
createSelector(
    state => state,
    bugs => bugs.filter(bug => bug.userId ===userId)
)

export const {addBug, bugResolved, getBugs, bugAssignedToUser} = actions;
export default reducer;