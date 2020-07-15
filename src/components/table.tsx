import React from 'react'
import { connect } from "react-redux"
import style from './table.module.css'

interface Props {
    columns: Array<{ title: string, dataIndex: string, key?: string, render?(value: any): any }>;
    datas: Array<any>;
    summarys?(datas: Array<any>): any;
}

function Table(props: Props) {
    return (<div className={style.table}>
        <table>
            <thead>
                <tr>{props.columns.map((column, index) => <th key={`title${index}`}>{column.title}</th>)}</tr>
            </thead>

            <tbody>
                {props.datas.map((data, index) => <tr key={`line${index}`}>
                    {props.columns.map((column, index) => (<td key={`${column.dataIndex}-${index}`}>{column.render ? column.render(data[column.dataIndex]) : data[column.dataIndex]}</td>))}
                </tr>)}
                {props.summarys && props.summarys(props.datas)}
            </tbody>
        </table>
    </div>)
}


const mapStateToProps = (state: any) => {
    const { bills, filters } = state

    let datas

    function checkMonth(data: any) {
        let year = parseInt(filters.month.split('-')[0])
        let month = parseInt(filters.month.split('-')[1])

        return year === new Date(parseInt(data.time)).getFullYear() && month === new Date(parseInt(data.time)).getMonth() + 1
    }

    function checkCategory(data: any) {
        return data.category === filters.category
    }

    datas = bills.allBills

    if (filters.month !== '') {
        datas = datas.filter(checkMonth)
    }

    if (filters.category !== '') {
        datas = datas.filter(checkCategory)
    }

    if (Object.keys(bills.categoryMap).length > 0) {
        datas = datas.map((item: any) => ({ ...item, category: item.category ? bills.categoryMap[item.category].name : '' }))
    }

    return { datas }
}

export default connect(mapStateToProps)(Table);