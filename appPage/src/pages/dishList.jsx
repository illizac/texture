import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { WhiteSpace, NavBar, Icon, List } from 'antd-mobile'
const Item = List.Item
import { GETDISH, DISHEDIT } from '../redux/createAction'

@connect(state => ({
    userinfo: state.global.userinfo,
    dishlist: state.global.dishlist
}), dispath => ({
    getDish(param = {}){
        dispath({
            type: GETDISH,
            param
        })
    },
    dishedit(data){ dispath({ type: DISHEDIT, data }) }
}))
class DishList extends React.Component{
    constructor(props){super(props)}

    componentWillMount(){
        if(this.props.userinfo.id){
            this.props.getDish({id: this.props.userinfo.id})
        }
    }

    toAdd = type => {
        this.props.dishedit(type == 'add' ? {} : type)
        hashHistory.push('/dishForm')
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <NavBar
                leftContent={<Icon onClick={_ => hashHistory.goBack()} type='left'/>}
                >{'菜单列表'}</NavBar>

                <div style={{flex: 1, overflow: 'hidden'}}>
                    <div style={{overflow: 'auto', height: '100%'}}>
                        <List renderHeader={() => '菜单列表'}>
                            {this.props.dishlist.map((v, k) => 
                                <Item 
                                arrow="horizontal" 
                                key={k}
                                extra={v.price ? `¥${v.price}` : ''} 
                                onClick={_ => this.toAdd(v)}>{
                                    v.dishname
                                }</Item>
                            )}
                            <Item onClick={_ => this.toAdd('add')}>
                                <i className="iconfont icon-add" style={{fontSize: 15}}></i> 添加新菜品
                            </Item>
                        </List>
                    </div>
                </div>

            </div>
        )
    }

}

export default DishList