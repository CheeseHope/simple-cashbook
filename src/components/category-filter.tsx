import React from 'react'
import { connect } from 'react-redux'
import { setCategoryFilter } from '../redux/actions'

interface Props {
    allCategorys: Array<{ id: string; name: string; type: number }>;
    setCategoryFilter(category: string): void;
}

function CategoryFilter(props: Props) {
    if (props.allCategorys.length === 0) {
        return null
    }
    return (<div>
        <label>请选择分类：</label>
        <select onChange={(e) => { props.setCategoryFilter(e.target.value) }}>
            <option value="">--please choose category--</option>
            {props.allCategorys.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
        </select>
    </div>)
}

function mapStateToProps(state: any) {
    return {
        allCategorys: state.bills.allCategorys
    }
}

export default connect(mapStateToProps, { setCategoryFilter })(CategoryFilter)