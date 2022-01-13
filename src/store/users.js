import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

let lastId = 0;
const {actions, reducer} = createSlice({
    name: 'users',
    initialState: [],
    reducers: ({
        addUser: (users, action) => {
            users.push({
                id: ++lastId,
                name: action.payload.name,
            })
        },
        getusers: (users, action) => {

        }
    })
})

export const {addUser} = actions;
export default reducer;