import React from 'react'
import { connect } from "react-redux"

interface Props {
    columns: Array<{ title: string, dataIndex: string, key?: string, render?(value: any): any }>;
    datas: Array<any>;
    summarys?(datas: Array<any>): any;
}

function Table(props: Props) {
    if (props.datas.length === 0) {
        return null
    }

    return (<div>
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

    function checkMonth(data: any) {
        let year = parseInt(filters.month.split('-')[0])
        let month = parseInt(filters.month.split('-')[1])

        return year === new Date(parseInt(data.time)).getFullYear() && month === new Date(parseInt(data.time)).getMonth() + 1
    }

    if (filters.month !== '') {
        return {
            datas: bills.allBills.filter(checkMonth)
        }
    }
    return {
        datas: bills.allBills
    }
}

export default connect(mapStateToProps)(Table);