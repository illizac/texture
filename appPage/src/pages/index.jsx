import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { WhiteSpace, Toast, NavBar, Icon, TabBar, Popover } from 'antd-mobile'
const Item = Popover.Item
import {  } from '../redux/createAction'

import OrderList from './orderList.jsx'
import CompleteList from './completeList.jsx'

@connect(state => ({
    userinfo: state.global.userinfo
}), dispath => ({
    
}))
class Home extends React.Component{
    constructor(props){super(props)}

    state = {
        selectedTab: 'none',
        hidden: false,
        fullScreen: true,
        visible: false
    }

    onSelect = (opt) => {
        switch(opt.props.value){
            case 'addDish':
                hashHistory.push('/dishList')
                break
            case 'addType':
                hashHistory.push('/typeList')
                break
            case 'settings':
                hashHistory.push('/settings')
                break
            case 'qrcode':
                hashHistory.push('/qrcode')
                break
            default: 
                break
        }

        this.setState({
          visible: false
        })
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <NavBar
                style={{height: 45}}
                rightContent={
                    <Popover 
                    mask
                    overlayClassName="fortest"
                    overlayStyle={{ color: 'currentColor' }}
                    visible={this.state.visible}
                    overlay={[
                      (<Item key="1" value="addDish">添加菜单</Item>),
                      (<Item key="2" value="addType">添加分类</Item>),
                      (<Item key="3" value="settings">设置</Item>),
                      (<Item key="4" value="qrcode">二维码</Item>),
                    ]}
                    align={{
                      overflow: { adjustY: 0, adjustX: 0 },
                      offset: [-10, 0],
                    }}
                    onSelect={this.onSelect}>
                        <div style={{
                          height: '100%',
                          padding: '0 15px',
                          marginRight: '-15px',
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                            <Icon type="ellipsis" />
                        </div>
                    </Popover>
                }
                >{this.props.userinfo.nickname || '商家用户001'}</NavBar>
                <TabBar
                style={{flex: 1}}
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white">
                    <TabBar.Item
                    ref='test'
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
                        <OrderList />
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
                        <CompleteList />
                    }</TabBar.Item>
                </TabBar>
            </div>
        )
    }

}

export default Home