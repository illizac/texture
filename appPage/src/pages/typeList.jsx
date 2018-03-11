import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { WhiteSpace, NavBar, Icon, List } from 'antd-mobile'
const Item = List.Item
import { GETTYPE, TYPEEDIT } from '../redux/createAction'

@connect(state => ({
    userinfo: state.global.userinfo,
    typelist: state.global.typelist
}), dispath => ({
    getType(param = {}){
        dispath({
            type: GETTYPE,
            param
        })
    },
    typeedit(data){ dispath({ type: TYPEEDIT, data }) }
}))
class TypeList extends React.Component{
    constructor(props){super(props)}

    componentWillMount(){
        if(this.props.userinfo.id){
            this.props.getType({id: this.props.userinfo.id})
        }
    }

    toAdd = type => {
        this.props.typeedit(type == 'add' ? {} : type)
        hashHistory.push('/typeForm')
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <NavBar
                leftContent={<Icon onClick={_ => hashHistory.goBack()} type='left'/>}
                >{'分类列表'}</NavBar>

                <div style={{flex: 1, overflow: 'hidden'}}>
                    <div style={{overflow: 'auto', height: '100%'}}>
                        <List renderHeader={() => '分类列表'}>
                            {this.props.typelist.map((v, k) => 
                                <Item 
                                arrow="horizontal" 
                                key={k}
                                extra='修改' 
                                onClick={_ => this.toAdd(v)}>{
                                    v.typename
                                }</Item>
                            )}
                            <Item onClick={_ => this.toAdd('add')}>
                                <i className="iconfont icon-add" style={{fontSize: 15}}></i> 添加新分类
                            </Item>
                        </List>
                    </div>
                </div>

            </div>
        )
    }

}

export default TypeList