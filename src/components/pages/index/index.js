import React,{Component} from 'react'
import Router from '../../../router/index'
import Routes from '../../../router/indexRoute'
import {NavLink} from 'react-router-dom'
import './index.css'

class Index extends Component{
    render(){
        return(
            <div>
                <header className="header">
                    <img className="img" src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt=""/>
                    <a className="xiazai" href="">下载APP</a>
                </header>
                <div className="nav">
                    <NavLink activeClassName="select" to="/index/tuijian">推荐</NavLink>
                    <NavLink activeClassName="select" to="/index/top">排行榜</NavLink>
                    <NavLink activeClassName="select" to="/index/search">搜索</NavLink>
                </div>
                <Router routes={Routes}></Router>
                <div className="bottom_bar">
                    <a className="more" href="javascript:;">安装QQ音乐 发现更多精彩</a>
                </div>
            </div>
        )
    }
}

export default Index
