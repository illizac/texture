import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { createForm } from 'rc-form'
import { Button, WingBlank, InputItem, List, WhiteSpace, Toast } from 'antd-mobile'
import { fishlogo } from '../assets/images/image'
import { LOGIN } from '../redux/createAction'

import Register from './register.jsx'

@connect(state => ({
    
}), dispath => ({
    login(param = {}){
        dispath({
            type: LOGIN,
            param
        })
    }
}))
class Login extends Register{

    handleSubmit = _ => {
        if(this.state.username && this.state.password){
            if(!this.state.passError && !this.state.userError){
                this.props.login({username: this.state.username.replace(/\s+/g, ""), password: this.state.password})
            }else{
                Toast.info('请填写正确信息')
            }
        }else{
            Toast.info('请填写正确信息')
        }
    }

    renderTitle = _ => '密码登录'

    navReg = _ => hashHistory.push('/register')

    onUserChange = val => {
        if(val.replace(/\s/g, '').length < 11){
            this.setState({userError: true})
        }else{
            this.setState({userError: false})
        }
        this.setState({username: val})
    }

    onPassChange = val => {
        if(/^[0-9a-zA-Z]{6,16}$/.test(val)){
            this.setState({passError: false})
        }else{
            this.setState({passError: true})
        }

        this.setState({password: val})
    }

    render() {
        return (
            <WingBlank>
                <img 
                style={{width: 150, height: 150, display: 'block', margin: '35px auto 35px'}}
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
                </List>
                <WhiteSpace/>
                <span style={{display: 'block', textAlign: 'right', padding: '0 5px'}}>
                	<a style={{color: '#108ee9'}} onClick={this.navReg}>去注册</a>
                </span>
                <WhiteSpace/>
                <Button type='primary' onClick={this.handleSubmit}>登录</Button>
            </WingBlank>
        )
    }

}

export default Login