import React from 'react'
import CsvImport from './components/csv-import'
import Table from './components/table'
import './style.css'

function App() {
  return (
    <div className="App">
      <CsvImport csvType="bill" />
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
      ]} />
    </div>
  );
}

export default App;
