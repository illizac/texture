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
        passError: false,
        userError: false
    }

    handleSubmit = _ => {
        if(this.state.username == '' || this.state.password == ''){
            Toast.info('请输入必要信息')
        }else{
            if(!this.state.passError && !this.state.userError){
                this.props.register({
                    username: this.state.username.replace(/\s+/g, ""), 
                    password: this.state.password, 
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

    renderTitle = _ => '用户注册'

    render() {
        return (
            <div>
                <NavBar
                mode='light'
                leftContent={<Icon onClick={this.back} type='left'/>}
                >{'用户注册'}</NavBar>
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
                    <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                </WingBlank>
            </div>
        )
    }

}

export default Register