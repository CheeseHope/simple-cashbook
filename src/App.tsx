import React from 'react'
import CsvImport from './components/csv-import'
import Table from './components/table'
import MonthFilter from './components/month-filter'
import AddBill from './components/add-bill'
import './style.css'

function App() {
  return (
    <div className="App">
      <CsvImport csvType="category" />
      <CsvImport csvType="bill" />
      <MonthFilter />
      <Table columns={[
        {
          title: '时间',
          dataIndex: 'time',
          render: (value) => (new Date(parseInt(value)).toString())
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
