import React from 'react'
import { useState } from 'react'
import CsvImport from './components/csv-import'
import Table from './components/table'
import MonthFilter from './components/month-filter'
import Category from './components/category-filter'
import AddBill from './components/add-bill'
import './style.css'

function App() {
  const [showAddBill, setShowAddBill] = useState<boolean>(false)
  return (
    <div className="App">
      <CsvImport csvType="category" />
      <CsvImport csvType="bill" />
      <div style={{marginBottom:'10px'}}>
        <label>可自行添加账单：</label>
        <button onClick={() => setShowAddBill(true)}>添加账单</button>
      </div>
      <AddBill show={showAddBill} close={() => setShowAddBill(false)} />
      <MonthFilter />

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
          return <>
            <tr>
              <td>总计</td>
              <td>收入</td>
              <td />
              <td>¥{datas.reduce((accumulator, currentValue) => {
                if (parseInt(currentValue.type) === 1) {
                  return accumulator + parseInt(currentValue.amount)
                } else {
                  return accumulator
                }
              }, 0)}
              </td>
            </tr>
            <tr>
              <td>总计</td> 
              <td>支出</td>
              <td />
              <td>¥{datas.reduce((accumulator, currentValue) => {
                if (parseInt(currentValue.type) === 0) {
                  return accumulator + parseInt(currentValue.amount)
                } else {
                  return accumulator
                }
              }, 0)}
              </td>
            </tr>
          </>
        }}
      />
    </div>
  );
}

export default App;
