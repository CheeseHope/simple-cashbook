import { IMPORT_CSV_BILL, IMPORT_CSV_CATEGORY, ADD_BILL } from '../action-types'
import redux from 'redux'

interface StateType {
    tableTitles: Array<string>;
    allBills: Array<{ time: Date, type: number, category?: string, amount: number }>;
    allCategorys: Array<{ id: string; name: string; type: number }>
}

const initState = {
    tableTitles: [],
    allBills: [],
    allCategorys: []
}

export default function (state: StateType = initState, action: redux.AnyAction) {
    switch (action.type) {
        case IMPORT_CSV_BILL:
            const { titles, datas } = transformIntoArr(action.payload, true)
            return {
                ...state,
                tableTitles: titles,
                allBills: datas
            }
        case IMPORT_CSV_CATEGORY:
            return {
                ...state,
                allCategorys: transformIntoArr(action.payload)
            }
        case ADD_BILL:
            const { time, type, category, amount } = action.payload
            return {
                ...state,
                allBills: state.allBills.concat([{ time, type, category, amount }])
            }
        default:
            break
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