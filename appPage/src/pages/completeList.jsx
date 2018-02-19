import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { WhiteSpace, Toast, NavBar, Icon, TabBar, List, Button, PullToRefresh, ListView } from 'antd-mobile'
const Item = List.Item
import { GETCOMPLETE } from '../redux/createAction'

@connect(state => ({
    userinfo: state.global.userinfo,
    completeList: state.global.completeList,
    loading: state.global.loading
}), dispath => ({
    fetch(param = {}){dispath({ type: GETCOMPLETE, param })}
}))
class CompleteList extends React.Component{
    constructor(props){super(props)}

    componentWillMount(){
        if(this.props.userinfo.id){
            this.props.fetch({id: this.props.userinfo.id})
        }
    }

    render() {
        return (
            <PullToRefresh
            style={{
              height: '100%',
              overflow: 'auto',
            }}
            refreshing={this.props.loading}
            onRefresh={_ => this.props.fetch({id: this.props.userinfo.id, refresh: true})}>
                {this.props.completeList.length > 0 ? <List 
                renderHeader={() => `已完成菜品列表`}>
                    {this.props.completeList.map((v, k) => 
                        <Item
                        key={k}
                        extra={`数量：${v.count}`}>{v.dishname}</Item>
                    )}
                </List>
                : <p style={{color: 'rgb(148,148,148)', textAlign: 'center'}}>暂无数据</p>}
            </PullToRefresh>
        )
    }

}

export default CompleteList