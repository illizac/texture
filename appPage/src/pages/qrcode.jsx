import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { NavBar, Icon } from 'antd-mobile'
import {  } from '../redux/createAction'
import QRCode from  'qrcode.react'
import { baseUrl } from '../../baseConf.js'

@connect(state => ({
    userinfo: state.global.userinfo
}), dispath => ({

}))
class Qrcode extends React.Component{
    constructor(props){super(props)}

    back = _ => hashHistory.goBack()

    render() {
        return (
            <div style={{height: '100%'}}>
                <NavBar
                mode='light'
                leftContent={<Icon onClick={this.back} type='left'/>}
                >{'二维码'}</NavBar>
                <div style={{paddingTop: 100, display: 'flex', justifyContent: 'center'}}>
                    <QRCode 
                    size={175}
                    value={`${baseUrl}/w?${this.props.userinfo.id ? `id=${this.props.userinfo.id}` : ''}`} />
                </div>
            </div>
        )
    }

}

export default Qrcode