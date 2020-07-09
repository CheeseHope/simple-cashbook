import { combineReducers } from 'redux'
import bills from './bills'
import filters from './filters'

export default combineReducers({ bills, filters });