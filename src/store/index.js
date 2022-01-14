import {configureStore} from '@reduxjs/toolkit';
import { createStore} from 'redux';
import reducer from './reducers';

const store = configureStore({reducer});
export default store;