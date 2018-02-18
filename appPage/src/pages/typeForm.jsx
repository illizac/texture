import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { WhiteSpace, NavBar, Icon, WingBlank, InputItem, Button  } from 'antd-mobile'
import { EDITTYPE, DELETETYPE } from '../redux/createAction'

@connect(state => ({
    userinfo: state.global.userinfo,
    typeeditinfo: state.global.typeeditinfo,
    loading: state.global.loading
}), dispath => ({
    edit(param = {}){
        dispath({type: EDITTYPE, param})
    },
    deleteType(param = {}){
        dispath({type: DELETETYPE, param})
    }
}))
class TypeForm extends React.Component{
    constructor(props){super(props)}

    componentWillMount(){
        if(this.props.typeeditinfo.id){
            this.setState({type: this.props.typeeditinfo.typename})
        }
    }

    state={
        type: ''
    }

    tpchange = val => this.setState({type: val})

    editType = _ => {
        if(this.props.userinfo.id && this.state.type){
            let obj = {
                userid: this.props.userinfo.id,
                typename: this.state.type
            }
            if(this.props.typeeditinfo.id){
                obj = Object.assign({}, obj, {
                    id: this.props.typeeditinfo.id
                })
            }
            this.props.edit(obj)
        }else{
            Toast.info('请输入完整信息')
        }
    }

    delete = _ => {
        if(this.props.typeeditinfo.id){
            this.props.deleteType({id: this.props.typeeditinfo.id})
        }
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <NavBar
                leftContent={<Icon onClick={_ => hashHistory.goBack()} type='left'/>}
                >{'编辑分类'}</NavBar>

                <WingBlank style={{paddingTop: 50}}>
                    <InputItem 
                    value={this.state.type}
                    clear
                    placeholder='请输入菜品分类'
                    onChange={this.tpchange} />
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button 
                    type="primary" 
                    loading={this.props.loading}
                    onClick={this.editType}>保存</Button>
                    <WhiteSpace />
                    <WhiteSpace />
                    {this.props.typeeditinfo.id ?
                        <Button 
                        type="warning" 
                        onClick={this.delete}>删除分类</Button>
                    : ''}
                </WingBlank>
            </div>
        )
    }

}

export default TypeForm