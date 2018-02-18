import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { WhiteSpace, NavBar, Icon, WingBlank, InputItem, Button, Toast, Picker, List } from 'antd-mobile'
import { GETTYPE } from '../redux/createAction'

@connect(state => ({
    userinfo: state.global.userinfo,
    dishiteminfo: state.global.dishiteminfo,
    loading: state.global.loading,
    typelist: state.global.typelist
}), dispath => ({
    getType(param = {}){
        dispath({ type: GETTYPE, param })
    },
}))
class DishForm extends React.Component{
    constructor(props){super(props)}

    componentWillMount(){
        if(this.props.userinfo.id){
            this.props.getType({id: this.props.userinfo.id})
        }

        if(this.props.dishiteminfo.id){
            this.setState({
                dishname: this.props.dishiteminfo.dishname,
                price: this.props.dishiteminfo.price,
                typeid: [ this.props.dishiteminfo.typeid ]
            })
        }
    }

    componentWillReceiveProps(n){
        if(n.typelist != this.props.typelist){
            let arr = []
            for(let i in n.typelist){
                arr.push({
                    value: n.typelist[i].id,
                    label: n.typelist[i].typename
                })
            }
            this.setState({typelist: arr})
        }
    }

    state={
        dishname: '',
        price: '',
        typeid: [],
        typelist: []
    }

    editType = _ => {
        if(this.props.userinfo.id && this.state.dishname && this.state.price && this.state.typeid[0]){
            let obj = {
                userid: this.props.userinfo.id,
                dishname: this.state.dishname,
                price: Number(this.state.price),
                typeid: this.state.typeid[0]
            }
            if(this.props.dishiteminfo.id){
                obj = Object.assign({}, obj, {
                    id: this.props.dishiteminfo.id
                })
            }
            console.log(obj)
            // this.props.edit(obj)
        }else{
            Toast.info('请输入完整信息')
        }
    }

    delete = _ => {
        // if(this.props.dishiteminfo.id){
        //     this.props.deleteType({id: this.props.dishiteminfo.id})
        // }
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <NavBar
                leftContent={<Icon onClick={_ => hashHistory.goBack()} type='left'/>}
                >{'编辑分类'}</NavBar>

                <WingBlank style={{paddingTop: 50}}>
                    <InputItem 
                    value={this.state.dishname}
                    clear
                    placeholder='请输入菜品名称'
                    onChange={val => this.setState({dishname: val})} />
                    <WhiteSpace />
                    <InputItem 
                    value={this.state.price}
                    clear
                    type='number'
                    placeholder='请输入菜品价格'
                    extra="元"
                    onChange={val => this.setState({price: val})} />
                    <WhiteSpace />
                    <List style={{ backgroundColor: 'white' }} >
                        <Picker 
                        data={this.state.typelist} 
                        value={this.state.typeid}
                        onChange={val => {
                            console.log(val)
                            this.setState({typeid: val})
                        }
                        }
                        cols={1}>
                            <List.Item arrow="horizontal">选择分类</List.Item>
                        </Picker>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button 
                    type="primary" 
                    loading={this.props.loading}
                    onClick={this.editType}>保存</Button>
                    <WhiteSpace />
                    <WhiteSpace />
                    {this.props.dishiteminfo.id ?
                        <Button 
                        type="warning" 
                        onClick={this.delete}>删除菜品</Button>
                    : ''}
                </WingBlank>
            </div>
        )
    }

}

export default DishForm