import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { setMonthFilter } from '../redux/actions'

interface Props {
    times: Array<number>;
    setMonthFilter(month: string): void;
}

function MonthFilter(props: Props) {
    const [years, setYears] = useState<Array<number>>([])
    const [months, setMonths] = useState<Array<number>>([])

    const [show, setShow] = useState<boolean>(false)
    const [selectedYear, setSelectedYear] = useState<string>('')
    const [selectedMonth, setSelectedMonth] = useState<string>('')

    useEffect(() => {
        if (props.times.length === 0) {
            return
        }

        let timesSet = new Set(props.times)
        let timesNew = Array.from(timesSet)
        timesNew.sort((a, b) => a - b)

        let minYear = new Date(timesNew[0]).getFullYear()
        let maxYear = new Date(timesNew[timesNew.length - 1]).getFullYear()
        setYears(bornYearArr(minYear, maxYear))
        setShow(true)
    }, [props.times])

    useEffect(() => {
        let arr = new Array(12).fill(1)
        let monthArr = arr.map((item, index) => index + 1)
        setMonths(monthArr)
    }, [])

    const bornYearArr = useCallback((min, max) => {
        let arr: Array<number> = new Array(max - min + 1).fill(min)
        arr.map((item, index) => min + index)
        return arr
    }, [])

    const changeSelect = (e: any, type: 'year' | 'month') => {
        if (type === 'year') {
            setSelectedYear(e.target.value)
        } else {
            setSelectedMonth(e.target.value)
        }
    }

    const triggerFilter = () => {
        if (selectedYear !== '' && selectedMonth !== '') {
            props.setMonthFilter(`${selectedYear}-${selectedMonth}`)
        }else{
            props.setMonthFilter('')
        }
    }

    useEffect(() => {
        triggerFilter()
    }, [selectedYear, selectedMonth])

    if (!show) {
        return null
    }

    return (<div style={{marginBottom:'10px'}}>
        <label>月份选择：</label>
        <select onChange={(e) => changeSelect(e, 'year')}>
            <option value="">--Please choose Year--</option>
            {years.map((item, index) => <option key={`year-option${index}`}>{item}</option>)}
        </select>
        <select onChange={(e) => changeSelect(e, 'month')}>
            <option value="">--Please choose Month--</option>
            {months.map((item, index) => <option key={`month-option${index}`}>{item}</option>)}
        </select>
    </div>)
}

function mapStateToProps(state: any) {
    const { bills } = state
    return {
        times: bills.allBills.map((item: any) => parseInt(item.time))
    }
}

export default connect(mapStateToProps, { setMonthFilter })(MonthFilter)