import React from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'
import CsvImport from './components/csv-import'
import Table from './components/table'
import MonthFilter from './components/month-filter'
import Category from './components/category-filter'
import AddBill from './components/add-bill'
import './style.css'

function App(props: any) {
  const [showAddBill, setShowAddBill] = useState<boolean>(false)
  const [summaryType, setSummaryType] = useState<'total' | 'payment'>('total')

  const totalReduce = (filterValue: number) => {
    return (accumulator: any, currentValue: any) => {
      if (parseInt(currentValue.type) === filterValue) {
        return accumulator + parseInt(currentValue.amount)
      } else {
        return accumulator
      }
    }
  }

  const toPaymentArr = (datas: any) => {
    let datasNew = datas.filter((data: any) => parseInt(data.type) === 0)
    let paymentMap: any = {}
    datasNew.forEach((data: any) => {
      if (!paymentMap[data.category]) {
        paymentMap[data.category] = data.amount
      } else {
        paymentMap[data.category] = (parseInt(data.amount) + parseInt(paymentMap[data.category])).toString()
      }
    })
    let arr = []
    for (let key in paymentMap) {
      arr.push({
        category: key,
        amount: paymentMap[key]
      })
    }
    arr.sort((a, b) => parseInt(a.amount) - parseInt(b.amount))
    return arr
  }

  return (
    <div className="App">
      <CsvImport csvType="category" />
      <CsvImport csvType="bill" />
      <div style={{ marginBottom: '10px' }}>
        <label>可自行添加账单：</label>
        <button onClick={() => setShowAddBill(true)}>添加账单</button>
      </div>
      <AddBill show={showAddBill} close={() => setShowAddBill(false)} />
      <MonthFilter />
      <button onClick={() => setSummaryType('payment')} disabled={props.month === '' || props.category !== ''}>统计月支出</button>
      <Category />
      <Table columns={[
        {
          title: '时间',
          dataIndex: 'time',
          render: (value) => (new Date(parseInt(value)).toLocaleDateString())
        },
        {
          title: '类型',
          dataIndex: 'type',
          render: (value) => (parseInt(value) === 1 ? '收入' : '支出')
        },
        {
          title: '分类',
          dataIndex: 'category'
        },
        {
          title: '金额',
          dataIndex: 'amount',
          render: (value) => (`￥${value}`)
        }
      ]}
        summarys={(datas) => {
          if (summaryType === 'total') {
            return <>
              <tr style={{ background: '#e4e4e4' }}>
                <td>总计</td>
                <td>收入</td>
                <td>-</td>
                <td>¥{datas.reduce(totalReduce(1), 0)}
                </td>
              </tr>
              <tr style={{ background: '#e4e4e4' }}>
                <td>总计</td>
                <td>支出</td>
                <td>-</td>
                <td>¥{datas.reduce(totalReduce(0), 0)}
                </td>
              </tr>
            </>
          } else {
            const paymentArr = toPaymentArr(datas)
            return <>
              {paymentArr.map((item, index) => <tr key={index} style={{ background: '#e4e4e4' }}>
                <td>总计</td>
                <td>支出</td>
                <td>{item.category}</td>
                <td>{item.amount}</td>
              </tr>)}
            </>
          }
        }}
      />
    </div>
  );
}

export default connect((state: any) => {
  return {
    month: state.filters.month,
    category: state.filters.category
  }
})(App);
