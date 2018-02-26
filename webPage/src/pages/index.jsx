import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { WhiteSpace, Toast, NavBar, Icon, TabBar, Popover, Tabs } from 'antd-mobile'
const Item = Popover.Item
import { GETDISH } from '../redux/createAction'
import { qs } from '../fetch/toolApi'

@connect(state => ({
    dishinfo: state.global.dishinfo,
}), dispath => ({
    getdish(param = {}){dispath({type: GETDISH, param})}
}))
class Home extends React.Component{
    constructor(props){super(props)}

    componentWillMount(){
        this.props.getdish(qs('id') ? {id: qs('id')} : {})
    }

    state = {

    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
               <div style={{flex: 1}}>
                    <Tabs
                    tabs={this.props.dishinfo.type}>
                        
                        {this.props.dishinfo.type ? this.props.dishinfo.type.map((v,k) => <div key={k}>
                           {this.props.dishinfo.dishes.map((val, key) => 
                                val.typeid == v.id ? <div>{val.dishname}</div> : ''
                            )}
                        </div>) : <div></div>}
                        
                    </Tabs>
               </div>
               <div style={{height: 45, background: 'rgb(72,71,72)'}}>
                   
               </div>
            </div>
        )
    }

}

export default Home