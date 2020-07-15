import { IMPORT_CSV, ADD_BILL, SET_MONTH_FILTER } from './action-types'

export const importCsv = (type: 'bill' | 'category', csvText: any) => ({
    type: IMPORT_CSV,
    payload: {
        csvType:type,
        csvText
    }
})

export const addBill = (time: string, type: string, amount: number, category: string) => ({
    type: ADD_BILL,
    payload: {
        time, type, amount, category
    }
})

export const setMonthFilter = (month: string) => ({
    type: SET_MONTH_FILTER,
    payload: month
})