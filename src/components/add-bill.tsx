import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { addBill } from '../redux/actions'
import style from './add-bill.module.css'

interface Props {
    category: Array<{ id: string; name: string; type: number }>;
    categoryMap: any;
    addBill(time: string, type: string, amount: number, category: string): void;
    show: boolean;
    close():void;
}

interface Time {
    year: string;
    month: string;
    day: string;
    clock: string;
}

function AddBill(props: Props) {
    const [time, setTime] = useState<Time>({ year: '', month: '', day: '', clock: '' })
    const [dayArr, setDayArr] = useState<Array<number>>([])
    const [category, setCategory] = useState<string>('')
    const [type, setType] = useState<number>(0)
    const [amount, setAmount] = useState<number>(0)

    const selectChange = (e: any, type: 'year' | 'month' | 'day' | 'category' | 'type') => {
        let value = e.target.value
        if (type !== 'category' && type !== 'type') {
            let obj: any = new Object()
            obj[type] = value
            setTime(Object.assign(time, obj))

            if (type === 'year' || type === 'month') {
                if (time.year && time.month) {
                    let arr = new Array(new Date(parseInt(time.year), parseInt(time.month), 0).getDate()).fill(1)
                    setDayArr(arr.map((item, index) => index + 1))
                }
            }
        }

        if (type === 'category') {
            setCategory(value)
            if (Object.keys(props.categoryMap).length > 0 && props.categoryMap[value].type !== type) {
                setType(props.categoryMap[value].type)
            }
        }

        if (type === 'type') {
            setType(value)
            if (Object.keys(props.categoryMap).length > 0 && props.categoryMap[value].type !== type) {
                setCategory('')
            }
        }
    }

    const change = (e: any, type: 'clock' | 'money') => {
        let value = e.target.value
        if (type === 'clock') {
            setTime(Object.assign(time, { clock: e.target.value }))
        } else {
            setAmount(value)
        }
    }

    const checkTime = () => {
        if (time.year && time.month && time.day && time.clock) {
            return true
        } else {
            return false
        }
    }

    const sumbit = () => {
        if (checkTime() && amount) {
            const { year, month, day, clock } = time
            let hour = clock.split(':')[0]
            let minute = clock.split(':')[1]
            let timeStamp = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute)).getTime()
            props.addBill(timeStamp.toString(), type.toString(), amount, category)
            props.close()
        }
    }

    if(!props.show) {
        return null
    }

    return (<div className={style['add-bill-dialog']}>
        <div className={style['btn-area']}>
            <span onClick={props.close}>x</span>
        </div>
        <div>
            <label>时间</label>
            <select onChange={(e) => selectChange(e, 'year')}>
                <option value="">--year--</option>
                {[2018, 2019, 2020, 2021, 2022].map((item) => (<option key={`yearOption${item}`}>{item}</option>))}
            </select>
            <select onChange={(e) => selectChange(e, 'month')}>
                <option value="">--month--</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (<option key={`monthOption${item}`}>{item}</option>))}
            </select>
            <select disabled={dayArr.length === 0} onChange={(e) => selectChange(e, 'day')}>
                <option value="">--day--</option>
                {dayArr.map((item) => <option key={`dayOption${item}`}>{item}</option>)}
            </select>
            <input type="time" onChange={(e) => change(e, 'clock')} />
        </div>

        <div>
            <label>类型</label>
            <select onChange={(e) => selectChange(e, 'type')} value={type}>
                <option value={1}>收入</option>
                <option value={0}>支出</option>
            </select>
        </div>

        <div>
            <label>分类</label>
            <select disabled={props.category.length === 0} onChange={(e) => selectChange(e, 'category')} value={category}>
                <option value="">--Please choose Category--</option>
                {props.category.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
            </select>
        </div>

        <div>
            <label>金额</label>
            <input type="number" placeholder="请输入金额" onChange={(e) => change(e, 'money')} />
        </div>

        <div className={style['btn-area']}>
            <button onClick={sumbit}>提交</button>
        </div>
    </div>)
}

export default connect((state: any) => {
    const { bills } = state

    return {
        category: bills.allCategorys,
        categoryMap: bills.categoryMap
    }
}, { addBill })(AddBill)