import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { WhiteSpace, Toast, NavBar, Icon, TabBar, Popover } from 'antd-mobile'
const Item = Popover.Item
import {  } from '../redux/createAction'
import { qs } from '../fetch/toolApi'

@connect(state => ({

}), dispath => ({
    
}))
class Home extends React.Component{
    constructor(props){super(props)}

    state = {

    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
               {
                qs('id') || 0
               } 
            </div>
        )
    }

}

export default Home