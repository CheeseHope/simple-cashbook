import React from 'react'
import { connect } from "react-redux"

interface Props {
    columns: Array<{ title: string, dataIndex: string, key?: string, render?(value: any): any }>;
    datas: Array<any>;
}

function Table(props: Props) {
    return (<div>
        <table>
            <thead>
                <tr>{props.columns.map((column, index) => <th key={index}>{column.title}</th>)}</tr>
            </thead>

            <tbody>
                {props.datas.map((data, index) => <tr>
                    {props.columns.map((column, index) => (<td>{column.render ? column.render(data[column.dataIndex]) : data[column.dataIndex]}</td>))}
                </tr>)}
            </tbody>
        </table>
    </div>)
}

const mapStateToProps = (state: any) => {
    const { bills } = state
    return {
        datas: bills.allBills
    }
}

export default connect(mapStateToProps)(Table);