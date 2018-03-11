import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { WhiteSpace, Toast, NavBar, Icon, WingBlank, Picker, List } from 'antd-mobile'
import { GETDISH, SETTLE } from '../redux/createAction'

const grad = '(#108ee9, rgb(245,245,245), rgb(245,245,245), rgb(245,245,245))'
const gradient = {
    background: `-webkit-linear-gradient${grad}`, 
    background: `-o-linear-gradient${grad}`, 
    background: `-moz-linear-gradient${grad}`,
    background: `linear-gradient${grad}`
}

@connect(state => ({
    dishinfo: state.global.dishinfo,
    dishList: state.global.dishList
}), dispath => ({
    settle(param = {}){dispath({type: SETTLE, param})}
}))
class Settle extends React.Component{
    constructor(props){super(props)}

    componentWillMount(){
        let arr = []
        for(let i = 1; i <= this.props.dishinfo.tablenum; i++){
            arr.push({label: `${i}号桌`, value: i})
        }
        this.setState({data: arr})
    }

    state = {
        tablenum: [],
        data: []
    }


    back = _ => hashHistory.replace('/home')

    onSubmit = _ => {
        if(!this.state.tablenum.length){
            Toast.info('请先选择桌号')
        }else{
            let list = this.props.dishList.list
            let arr = list.map(v => Object.assign({tablenum: this.state.tablenum[0]}, v))
            this.props.settle({dish: JSON.stringify(arr)})
        }
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <NavBar
                leftContent={<Icon onClick={this.back} type='left'/>}
                >{'订单结算'}</NavBar>



                <div style={Object.assign({}, {flex: 1, overflow: 'hidden'}, gradient)}>
                    <WingBlank size='md' style={{height: '100%', overflow: 'auto'}}>
                        <WhiteSpace />
                        <div style={{background: '#fff', borderRadius: 2, padding: '0 15px'}}>
                            <div style={{height: 44, lineHeight: '44px', fontWeight: 'bold', fontSize: 18, borderBottom: '2px solid #dedede'}}>{this.props.dishinfo.nickname || 'Default'}</div>
                            <div>{this.props.dishList.list.map((v, k) => 
                                <div key={k} style={{height: 44, borderBottom: '1px dotted #dedede', display: 'flex', alignItems: 'center'}}>
                                    <span>{v.dishname}</span>
                                    <span style={{flex: 1, textAlign: 'right', paddingRight: 20}}>{`x ${v.count}`}</span>
                                    <span style={{width: 70, textAlign: 'right', fontWeight: 'bold'}}>{`¥ ${( Number(v.price) * Number(v.count) ).toFixed(2)}`}</span>
                                </div>
                            )}</div>
                            <div style={{height: 44, lineHeight: '44px', fontSize: 16, textAlign: 'right'}}>{`小计 ¥ ${this.props.dishList.price || '0.00'}`}</div>
                        </div>

                        <WhiteSpace />
                        <List style={{ backgroundColor: 'white' }} className="picker-list">
                            <Picker extra="请选择(可选)"
                              data={this.state.data}
                              title="桌号"
                              cols='1'
                              value={this.state.tablenum}
                              onOk={e => this.setState({tablenum: e})}
                            >
                              <List.Item arrow="horizontal">桌号</List.Item>
                            </Picker>
                        </List>
                        <WhiteSpace />
                    </WingBlank>
                </div>



                <div style={{height: 50, background: 'rgb(72,71,72)', color: '#fff', display: 'flex'}}>
                   <div style={{flex: 1, display: 'flex', alignItems: 'center', paddingLeft: 20, fontWeight: 'bold', fontSize: 18}}>
                       {`¥ ${this.props.dishList.price}`}
                   </div>
                   <div 
                   onClick={this.onSubmit}
                   style={{
                    background: 'rgb(30, 210, 80)', 
                    color: '#fff',
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    padding: '0 30px', 
                    fontSize: 16}}>确认支付</div>
               </div>
            </div>
        )
    }

}

export default Settle














