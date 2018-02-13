import React from 'react'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import { hashHistory } from 'react-router'
import { Button, WingBlank, InputItem, List, WhiteSpace, Toast, NavBar, Icon } from 'antd-mobile'
import { REGISTER } from '../redux/createAction'
import { fishlogo } from '../assets/images/image'

@connect(state => ({
    
}), dispath => ({
    register(param = {}){
        dispath({
            type: REGISTER,
            param
        })
    }
}))
class Register extends React.Component{
    constructor(props){
        super(props)     
    }

    state = {
        username: '',
        password: '',
        tablenum: '',
        nickname: '',
        passError: false,
        userError: false,
        tbError: false,
        nickError: false
    }

    handleSubmit = _ => {
        if(this.state.tablenum == '' || this.state.username == '' || this.state.password == '' || this.state.nickname == ''){
            Toast.info('请输入必要信息')
        }else{
            if(!this.state.passError && !this.state.userError && !this.state.tbError && !this.state.nickError){
                this.props.register({
                    username: this.state.username.replace(/\s+/g, ""), 
                    password: this.state.password, 
                    tablenum: this.state.tablenum,
                    nickname: this.state.nickname
                })
            }else{
                Toast.info('请填写正确信息注册')
            }
        }
        
    }

    onUserChange = val => {
        this.setFunc(val, val => val.replace(/\s/g, '').length == 11, 'userError', 'username')
    }

    onPassChange = val => {
        this.setFunc(val, val => /^[0-9a-zA-Z]{6,16}$/.test(val), 'passError', 'password')
    }

    tbChange = val => {
        this.setFunc(val, val => String(val).length > 0, 'tbError', 'tablenum')
    }

    nickChange = val => {
        this.setFunc(val, val => {
            let l = String(val).length
            return l >= 1 && l <= 16
        }, 'nickError', 'nickname')
    }

    setFunc = (val, regFunc, err, param) => {
        let obj = {}

        obj[param] = val
        if(regFunc(val)){
            obj[err] = false
        }else{
            obj[err] = true
        }

        obj[err] = regFunc(val) ? false : true

        this.setState(obj)
    }

    back = _ => hashHistory.goBack()

    renderTitle = _ => '账号注册'

    render() {
        return (
            <div>
                <NavBar
                mode='light'
                leftContent={<Icon onClick={this.back} type='left'/>}
                >{'商家注册'}</NavBar>
                <WingBlank>
                    <img 
                    style={{width: 150, height: 150, display: 'block', margin: '0 auto'}}
                    src={fishlogo} />
                    <List 
                    renderHeader={this.renderTitle}>
                        <InputItem
                        value={this.state.username}
                        onChange={this.onUserChange}
                        onErrorClick={_ => {
                            if (this.state.userError) {
                                Toast.info('请输入正确手机号');
                            }
                        }}
                        error={this.state.userError}
                        type='phone'
                        clear
                        placeholder='手机号'>手机号</InputItem>

                        <InputItem 
                        value={this.state.nickname}
                        onErrorClick={_ => {
                            if (this.state.nickError) {
                                Toast.info('请输入16位以下用户名');
                            }
                        }}
                        clear
                        error={this.state.nickError}
                        placeholder='请输入用户名'
                        onChange={this.nickChange}>用户名</InputItem>

                        <InputItem 
                        value={this.state.password}
                        onErrorClick={_ => {
                            if (this.state.passError) {
                                Toast.info('请输入6-16位字母数字');
                            }
                        }}
                        clear
                        error={this.state.passError}
                        onChange={this.onPassChange}
                        placeholder='请输入密码'
                        type='password'>密码</InputItem>
                        <InputItem 
                        value={this.state.tablenum}
                        onErrorClick={_ => {
                            if (this.state.tbError) {
                                Toast.info('请输入餐桌数量');
                            }
                        }}
                        clear
                        error={this.state.tbError}
                        placeholder='请输入餐桌数量'
                        onChange={this.tbChange}
                        type='number'>餐桌数</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                </WingBlank>
            </div>
        )
    }

}

export default Register