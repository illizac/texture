import React from 'react'
import { connect } from 'react-redux'
import { WhiteSpace, Toast, WingBlank } from 'antd-mobile'
import { success } from '../assets/images/image'

@connect(state => ({
    dishList: state.global.dishList,
}), dispath => ({}))
class PayDone extends React.Component{
    constructor(props){super(props)}

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <div style={{overflow: 'auto'}}>
                    <div style={{borderBottom: '1px solid #dedede', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff'}}>
                        <img src={success} style={{display: 'block', width: 40, height: 40, margin: '40px 0'}}/>
                        <span style={{paddingBottom: 40}}>支付成功</span>
                    </div>
                    <WhiteSpace />
                    <div size='md'>
                        <WingBlank style={{color: '#aaa'}}>点餐列表</WingBlank>
                        <WhiteSpace />
                        <div style={{background: '#fff'}}>
                            <WingBlank>
                                {this.props.dishList.list.map((v, k) => 
                                    <div key={k} style={{height: 44, borderBottom: '1px dotted #dedede', display: 'flex', alignItems: 'center'}}>
                                        <span>{v.dishname}</span>
                                        <span style={{flex: 1, textAlign: 'right', paddingRight: 20}}>{`x ${v.count}`}</span>
                                        <span style={{width: 70, textAlign: 'right', fontWeight: 'bold'}}>{`¥ ${( Number(v.price) * Number(v.count) ).toFixed(2)}`}</span>
                                    </div>
                                )}
                            </WingBlank>
                        </div>
                        <WhiteSpace />
                    </div>
                </div>
            </div>
        )
    }

}

export default PayDone














