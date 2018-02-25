import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { WhiteSpace, Toast, NavBar, Icon, TabBar, List, Button, PullToRefresh, ListView } from 'antd-mobile'
const Item = List.Item
import { GETORDER, EDITORDER } from '../redux/createAction'

@connect(state => ({
    userinfo: state.global.userinfo,
    orderlist: state.global.orderlist,
    loading: state.global.loading
}), dispath => ({
    getorder(param = {}){dispath({ type: GETORDER, param })},
    edit(param = {}){dispath({type: EDITORDER, param})}
}))
class OrderList extends React.Component{
    constructor(props){super(props)}

    componentWillMount(){
        console.log(this.props.userinfo)
        if(this.props.userinfo.id){
            this.props.getorder({id: this.props.userinfo.id, state: 2, refresh: false})
        }
    }

    state = {
    }

    render() {
        return (
            <PullToRefresh
            style={{
              height: '100%',
              overflow: 'auto',
            }}
            refreshing={this.props.loading}
            onRefresh={_ => this.props.getorder({id: this.props.userinfo.id, state: 2, refresh: true})}>
                    {this.props.orderlist.length > 0 ? this.props.orderlist.map((val, key) => 
                        <List 
                        key={key}
                        renderHeader={() => `桌号 ${val.tablenum}`}>
                            {val.orderlist.map((v, k) => 
                                <Item
                                key={k}
                                extra={`数量：${v.count}`}>{v.dishname}</Item>
                            )}
                            <div style={{display: 'flex', justifyContent: 'flex-end', padding: '7px 15px'}}>
                                <Button 
                                inline 
                                type='primary'
                                size='small'
                                onClick={_ => this.props.edit({id: this.props.userinfo.id, tablenum: val.tablenum })}>完成</Button>
                            </div>
                        </List>
                    ) 
                    : <p style={{color: 'rgb(148,148,148)', textAlign: 'center'}}>暂无数据</p>}
            </PullToRefresh>
        )
    }

}

export default OrderList