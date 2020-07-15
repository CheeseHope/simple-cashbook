import { SET_MONTH_FILTER, SET_CATEGORY_FILTER } from '../action-types'
import redux from 'redux'

interface StateType {
    month: string; // 2020-6
    category: string;
}

const initState = {
    month: '',
    category: ''
}

export default function (state: StateType = initState, action: redux.AnyAction) {
    switch (action.type) {
        case SET_MONTH_FILTER:
            return {
                ...state,
                month: action.payload
            }
        case SET_CATEGORY_FILTER:
            return {
                ...state,
                category: action.payload
            }

        default:
            return state
    }
}