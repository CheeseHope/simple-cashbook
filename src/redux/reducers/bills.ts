import { IMPORT_CSV, ADD_BILL } from '../action-types'
import redux from 'redux'

interface StateType {
    billTitles: Array<string>;
    allBills: Array<{ time: Date, type: number, category?: string, amount: number }>;
    allCategorys: Array<{ id: string; name: string; type: number }>
}

const initState = {
    billTitles: [],
    allBills: [],
    allCategorys: []
}

export default function (state: StateType = initState, action: redux.AnyAction) {
    switch (action.type) {
        case IMPORT_CSV:
            const { csvType, csvText } = action.payload
            if (csvType === 'bill') {
                const { titles, datas } = transformIntoArr(csvText, true)
                return {
                    ...state,
                    billTitles: titles,
                    allBills: datas
                }
            } else {
                return {
                    ...state,
                    allCategorys: transformIntoArr(action.payload)
                }
            }
        case ADD_BILL:
            const { time, type, category, amount } = action.payload
            return {
                ...state,
                allBills: state.allBills.concat([{ time, type, category, amount }])
            }
        default:
            return state
    }
}

function transformIntoArr(csvText: string, titleNeed?: boolean) {
    let dataWithTitle: any = csvText.split('\n')
    let titles = dataWithTitle.shift().split(',')

    let datas = dataWithTitle

    let datasNew = datas.map((item: any, index: number) => {
        let itemArr = item.split(',')
        let obj: any = new Object()
        itemArr.forEach((value: any, index: number) => {
            obj[titles[index]] = value
        });

        return obj
    })

    if (titleNeed) {
        return {
            datas: datasNew,
            titles: titles
        }
    }

    return datasNew
}