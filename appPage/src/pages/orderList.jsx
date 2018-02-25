import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { WhiteSpace, Toast, NavBar, Icon, TabBar, List, Button, PullToRefresh, ListView } from 'antd-mobile'
const Item = List.Item
import { GETORDER, EDITORDER, SETHEIGHT } from '../redux/createAction'

@connect(state => ({
    userinfo: state.global.userinfo,
    orderlist: state.global.orderlist,
    loading: state.global.loading,
    height: state.global.height
}), dispath => ({
    getorder(param = {}){dispath({ type: GETORDER, param })},
    edit(param = {}){dispath({type: EDITORDER, param})},
    setheight(data = 'auto'){dispath({type: SETHEIGHT, data})}
}))
class OrderList extends React.Component{
    constructor(props){super(props)}

    componentWillMount(){
        if(this.props.userinfo.id){
            this.props.getorder({id: this.props.userinfo.id, state: 2, refresh: false})
        }
    }

    componentDidUpdate(){
        let pwh = document.getElementById('pullWrapper').clientHeight,
            items = document.getElementsByClassName('listItem'),
            allh = 0

        for( let i = 0; i < items.length; i++ ){
            allh += items[i].clientHeight
        }

        if(pwh >= allh){
            this.props.setheight(pwh)
        }else{
            this.props.setheight()
        }
    }

    render() {
        return (
            <div style={{height: '100%'}} id='pullWrapper'>
                <PullToRefresh
                style={{
                  height: '100%',
                  overflow: 'auto',
                }}
                refreshing={this.props.loading}
                onRefresh={_ => this.props.getorder({id: this.props.userinfo.id, state: 2, refresh: true})}>
                        <div style={{height: this.props.height}}>
                            {this.props.orderlist.length > 0 ? this.props.orderlist.map((val, key) => 
                                <div className='listItem'>
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
                                </div>) 
                            : <div className='listItem' style={{color: 'rgb(148,148,148)', textAlign: 'center', paddingTop: 15}}>暂无数据</div>}
                        </div>
                </PullToRefresh>
            </div>
        )
    }

}

export default OrderList