import { SET_MONTH_FILTER } from '../action-types'
import redux from 'redux'

interface StateType {
    month: string; // 2020-06
    category: string;
}

const initState = {
    month: null,
    category: ''
}

export default function (state = initState, action: redux.AnyAction) {
    switch (action.type) {
        case SET_MONTH_FILTER:
            return {
                ...state,
                month: action.payload
            }
        default:
            return state
    }
}