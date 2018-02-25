import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { WhiteSpace, Toast, NavBar, Icon, TabBar, List, Button, PullToRefresh, ListView } from 'antd-mobile'
const Item = List.Item
import { GETCOMPLETE, SETCOMPHEIGHT } from '../redux/createAction'

@connect(state => ({
    userinfo: state.global.userinfo,
    completeList: state.global.completeList,
    loading: state.global.loading,
    height: state.global.compHeight
}), dispath => ({
    fetch(param = {}){dispath({ type: GETCOMPLETE, param })},
    setheight(data = 'auto'){dispath({type: SETCOMPHEIGHT, data})}
}))
class CompleteList extends React.Component{
    constructor(props){super(props)}

    componentWillMount(){
        if(this.props.userinfo.id){
            this.props.fetch({id: this.props.userinfo.id})
        }
    }

    componentDidUpdate(){
        let wraph = document.getElementById('completeWrapper').clientHeight,
            items = document.getElementsByClassName('compItem'),
            allh = 0

        for( let i = 0; i < items.length; i++ ){
            allh += items[i].clientHeight
        }

        if(wraph >= allh){
            this.props.setheight(wraph)
        }else{
            this.props.setheight()
        }
    }

    render() {
        return (
            <div style={{height: '100%'}} id='completeWrapper'>
                <PullToRefresh
                style={{
                  height: '100%',
                  overflow: 'auto',
                }}
                refreshing={this.props.loading}
                onRefresh={_ => this.props.fetch({id: this.props.userinfo.id, refresh: true})}>
                    <div style={{height: this.props.height}}>
                        {this.props.completeList.length > 0 ? <div className='compItem'>
                                <List 
                                renderHeader={() => `已完成菜品列表`}>
                                    {this.props.completeList.map((v, k) => 
                                        <Item
                                        key={k}
                                        extra={`数量：${v.count}`}>{v.dishname}</Item>
                                    )}
                                </List>
                            </div>
                        : <div className='compItem' style={{color: 'rgb(148,148,148)', textAlign: 'center', paddingTop: 15}}>暂无数据</div>}
                    </div>
                </PullToRefresh>
            </div>
        )
    }

}

export default CompleteList