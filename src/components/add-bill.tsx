import React from 'react'
import { connect } from 'react-redux'

interface Props {
    category: Array<{ id: string; name: string; type: number }>;
}

function AddBill(props: Props) {
    return (<div>
        <form>
            <div>
                <label>时间</label>
                
            </div>
            <div>
                <label>类型</label>
                <select>
                    <option value={1}>收入</option>
                    <option value={0}>支出</option>
                </select>
            </div>
            <div>
                <label>分类</label>
                <select>
                    <option value="">--Please choose Category--</option>
                    {props.category.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
                </select>
            </div>
            <div>
                <label>金额</label>
                <input type="number" placeholder="请输入金额"/>
            </div>
        </form>
    </div>)
}

export default connect()(AddBill)