import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { WhiteSpace, Toast, NavBar, Icon, TabBar } from 'antd-mobile'
import {  } from '../redux/createAction'

@connect(state => ({
    userinfo: state.global.userinfo
}), dispath => ({
    
}))
class Home extends React.Component{
    constructor(props){super(props)}

    state = {
        selectedTab: 'none',
        hidden: false,
        fullScreen: true
    }

    navSettings = _ => hashHistory.push('/settings')

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <NavBar
                rightContent={<Icon onClick={this.navSettings} type='ellipsis'/>}
                >{this.props.userinfo.nickname || '商家用户001'}</NavBar>

                <div style = {{flex: 1}}>
                    <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white">
                        <TabBar.Item
                        icon={<i class="iconfont">&#xe89a;</i>}
                        selectedIcon={<i class="iconfont">&#xe89b;</i>}
                        title="未完成订单"
                        key="none"
                        selected={this.state.selectedTab === 'none'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'none',
                            });
                        }}>{
                            111
                        }</TabBar.Item>
                        <TabBar.Item
                        icon={<i class="iconfont">&#xe891;</i>}
                        selectedIcon={<i class="iconfont">&#xe892;</i>}
                        title="已完成订单"
                        key="done"
                        selected={this.state.selectedTab === 'done'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'done',
                            });
                        }}>{
                            222
                        }</TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }

}

export default Home