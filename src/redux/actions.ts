import { IMPORT_CSV_BILL, IMPORT_CSV_CATEGORY, ADD_BILL, SET_MONTH_FILTER } from './action-types'

export const importCsvBill = (csvText: string) => ({
    type: IMPORT_CSV_BILL,
    payload: csvText
})

export const importCsvCategory = (csvText: string) => ({
    type: IMPORT_CSV_CATEGORY,
    payload: csvText
})

export const addBill = (time: Date, type: number, amount: number, category: string) => ({
    type: ADD_BILL,
    payload: {
        time, type, amount, category
    }
})

export const setMonthFilter = (month: string) => ({
    type: SET_MONTH_FILTER,
    payload: month
})