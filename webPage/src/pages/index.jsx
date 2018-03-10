import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { WhiteSpace, Toast, NavBar, Icon, TabBar, Popover, Tabs, Badge } from 'antd-mobile'
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
        dishList: [],
        count: 0,
        price: 0
    }

    addDish = obj => {
        let val = Object.assign({}, obj),
            arr = this.state.dishList,
            rep = {sym:false},
            price = val.price

        val.dishid = val.id

        delete val.price
        delete val.typeid
        delete val.id

        for(let i in arr){
            if(arr[i].dishid == val.dishid){
                rep = {
                    index: i,
                    sym: true
                }
            }
        }
        if(rep.sym){
            let count = arr[rep.index].count + 1
            arr[rep.index] = Object.assign({}, arr[rep.index], {count})
            obj.count = count
        }else{
            arr.push(Object.assign({}, val, {count: 1}))
            obj.count = 1
        }

        this.setState({
            dishList: arr,
            count: this.state.count + 1,
            price: ( Number(this.state.price) + Number(price) ).toFixed(2)
        })
    }

    cutDish = obj => {
        let arr = this.state.dishList,
            price = obj.price

        for(let i in arr){
            if(arr[i].dishid == obj.id){
                let count = arr[i].count - 1
                obj.count = count
                if(count == 0){
                    arr.splice(i, i + 1)
                }else{
                    arr[i] = Object.assign({}, arr[i], {count})
                }
            }
        }

        this.setState({
            dishList: arr,
            count: this.state.count - 1,
            price: ( Number(this.state.price) - Number(price) ).toFixed(2)
        })
    }

    onSubmit = _ => console.log(this.state.dishList)

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
               <div style={{flex: 1, overflow: 'hidden'}}>
                    <Tabs
                    tabs={this.props.dishinfo.type}>
                        
                        {this.props.dishinfo.type.map((v,k) => <div key={k} style={{paddingTop: 10}}>
                           {this.props.dishinfo.dishes.map((val, key) => {

                                if(val.typeid == v.id){
                                    return (<div style={{background: '#fff', height: 120, marginBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                        <img style={{width: 100, height: 100, background: '#ccc', display: 'block', margin: '0 15px'}} />
                                        <div style={{flex: 1, height: 100, display: 'flex', paddingRight: 15, flexDirection: 'column'}}>
                                            <div style={{flex: 1}}>{val.dishname}</div>
                                            <div style={{height: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                                <div style={{color: 'rgb(254, 64, 51)', fontWeight: 'bold'}}>{`¥ ${val.price}`}</div>
                                                <span style={{display: 'flex', alignItems: 'center'}}>
                                                    {val.count ? 
                                                        <i 
                                                        class='iconfont' 
                                                        onClick={_ => this.cutDish(val)}
                                                        style={{color: 'rgb(33, 127, 255)', fontSize: 20, display: 'block'}}>&#xe619;</i>
                                                     : ''}
                                                    {val.count ? 
                                                        <span style={{padding: '0 15px'}} >{val.count}</span>
                                                     : ''}
                                                    <i 
                                                    class='iconfont' 
                                                    onClick={_ => this.addDish(val)}
                                                    style={{color: 'rgb(33, 127, 255)', fontSize: 20, display: 'block'}}>&#xe60d;</i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>)
                                }else{
                                    return ''
                                }

                           })}
                        </div>)}
                        
                    </Tabs>
               </div>
               <div style={{height: 50, background: 'rgb(72,71,72)', color: '#fff', display: 'flex'}}>
                   <div style={{flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center'}}>
                        <div style={{width: 40, paddingLeft: 15}}>
                            <Badge text={this.state.count}>
                                <span style={{ width: '26px', height: '26px', background: '#ddd', display: 'inline-block' }} />
                            </Badge>
                        </div>
                        <div style={{flex: 1, display: 'flex', paddingLeft: 15, alignItems: 'center'}}>{
                            this.state.dishList.length == 0 ? <span style={{color: 'rgb(140,140,140)'}}>未选购商品</span> : `¥ ${this.state.price}`
                        }</div>
                   </div>
                   <div 
                   onClick={this.onSubmit}
                   style={{
                    background: this.state.dishList.length == 0 ? 'rgb(88, 87, 88)' : 'rgb(30, 210, 80)', 
                    color: this.state.dishList.length == 0 ? 'rgb(140,140,140)' : '#fff',
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    padding: '0 30px', 
                    fontSize: 16}}>去结算</div>
               </div>
            </div>
        )
    }

}

export default Home














