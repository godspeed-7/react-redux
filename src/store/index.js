import {configureStore} from '@reduxjs/toolkit';
import { createStore} from 'redux';
import reducer from './reducers';
import logger from './middleware/logs';
import toast from './middleware/toast';
import api from './middleware/api'

const store = configureStore({reducer,  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger, toast, api]});
export default store;