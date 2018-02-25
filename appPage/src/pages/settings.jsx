import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { WhiteSpace, Toast, NavBar, Icon, TabBar, List, InputItem, Button, WingBlank } from 'antd-mobile'
import { SAVECHANGES, RESET } from '../redux/createAction'

@connect(state => ({
    userinfo: state.global.userinfo,
    loading: state.global.loading
}), dispath => ({
    saveChanges(param = {}){
        dispath({
            type: SAVECHANGES,
            param
        })
    },
    exit(){dispath({type: RESET})}
}))
class Settings extends React.Component{
    constructor(props){super(props)}

    componentWillMount(){
        this.setState({
            tablenum: this.props.userinfo.tablenum || '',
            nickname: this.props.userinfo.nickname || ''
        })
    }

    componentWillReceiveProps(n){
        if(n.userinfo != this.props.userinfo){
            this.setState({editstate: true})
        }
    }

    state = {
        tablenum: '',
        nickname: '',
        tbError: false,
        nickError: false,
        editstate: true,
        btnStyle: {
            padding: '0 20px'
        }
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

    save = _ => {
        if(!this.state.editstate){
            if(this.state.tablenum == '' || this.state.nickname == ''){
                Toast.info('请输入必要信息')
            }else{
                if(!this.state.tbError && !this.state.nickError){
                    this.props.saveChanges({
                        tablenum: this.state.tablenum,
                        nickname: this.state.nickname,
                        id: this.props.userinfo.id || ''
                    })
                }else{
                    Toast.info('请填写正确信息')
                }
            }
        }else{
            Toast.info('请先修改')
        }
    }

    back = _ => hashHistory.goBack()

    exit = _ => {
        localStorage.clear()
        setTimeout(_ => {
            this.props.exit()
            hashHistory.replace('/login')
            Toast.info('退出成功')
        }, 300)
    }


    render() {
        return (
            <div style={{height: '100%'}}>
                <NavBar
                mode='light'
                leftContent={<Icon onClick={this.back} type='left'/>}
                >{'设置'}</NavBar>
                <WhiteSpace/>
                <List>
                    <InputItem 
                    value={this.state.nickname}
                    onErrorClick={_ => {
                        if (this.state.nickError) {
                            Toast.info('请输入16位以下用户名');
                        }
                    }}
                    clear
                    disabled={this.state.editstate}
                    error={this.state.nickError}
                    placeholder='请输入用户名'
                    onChange={this.nickChange}>用户名</InputItem>
                    <InputItem 
                    value={this.state.tablenum}
                    onErrorClick={_ => {
                        if (this.state.tbError) {
                            Toast.info('请输入餐桌数量');
                        }
                    }}
                    clear
                    disabled={this.state.editstate}
                    error={this.state.tbError}
                    placeholder='请输入餐桌数量'
                    onChange={this.tbChange}
                    type='number'>餐桌数</InputItem>
                    <WhiteSpace/>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button 
                        inline 
                        onClick={_ => this.setState({editstate: false})}
                        style={this.state.btnStyle}>修改</Button>
                        <Button 
                        inline 
                        type='primary'
                        onClick={this.save} 
                        loading={this.props.loading}
                        style={this.state.btnStyle}>保存</Button>
                    </div>
                    <WhiteSpace/>
                </List>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank>
                    <Button type='warning' onClick={this.exit}>退出登录</Button>
                </WingBlank>
            </div>
        )
    }

}

export default Settings