import React, { Component } from 'react'
import './toplistData.css'
import {Icon} from 'antd'
import {songList} from '../../../common/js/API'

class ToplistData extends Component {
    constructor(props) {
        super()
        this.state={
            toplist:[],
            topinfo:[],
            src:[]
        }
    }
    componentDidMount(){
        var id=this.props.match.params.id
        // var pic=this.props.match.params.pic
        
        this.$http({
            url:songList+id
        }).then(d=>{
            console.log(d)
            this.setState({
                toplist:d.data.data.songList,
                topinfo:d.data.data.topInfo
            })
            // console.log(this.state.toplist)
        })
    }
    toplay(id,songid,albummid,singermid,singer,songName){
        this.props.history.push('/play/'+id+'/'+songid+'/'+albummid+'/'+singermid+'/'+singer+'/'+songName)
    }
    back(){
        this.props.history.go(-1)
    }
    render() {
        // var pic=this.props.match.params.pic
       var el =this.state.toplist.map((item,index)=>{
           return  <li className="song_list_item" key={item.songMid} onClick={()=>{this.toplay(item.songMid,item.songId,item.albumMid,item.singer[0].singerMid,item.singer[0].singerName,item.songName)}}>
           <div className="song_list_index">
               <span className="song_list_num">{index+1}</span>
               <span className="song_list_change">
               <Icon type="fire" />
                   170%</span>
           </div>
           <div className="song_list_bd">
               <h3 className="song_list_txt">{item.songName}</h3>
               {item.singer.map(item=>{
                   return <span className="song_list_desc" key={item.singerMid}>{item.singerName}</span>
               })}
               
           </div>
           <Icon className="down" type="vertical-align-bottom" />
       </li>
       })
        return (
            <div className="bc">
                <header className="top">
                    <div className="top_bar_box">
                        <img className="img" src="https://y.gtimg.cn/music/common/upload/t_playsong_ad/1207759.png?max_age=2592000" alt="" />
                        <div className="right">
                            <h3 className="more_top">更多QQ音乐排行榜</h3>
                            <a onClick={()=>{this.back()}} className="check" href="javascript:;">戳我查看</a>
                        </div>
                    </div>
                    <div className="player">
                        <div className="player_cover">
                            <img src="https://y.gtimg.cn/music/photo_new/T003R300x300M000001oLD650CTF7Z.jpg?max_age=2592000" alt="" />
                        </div>
                        <div className="player_info">
                            <h2 className="player_info_tit">流行指数榜</h2>
                            <p className="player_info_txt">流行指数榜 第171天</p>
                            <p className="player_info_desc">更新时间：2019-06-20</p>
                        </div>
                        <div className="player_wrap">
                            <a className="player__btn" href="javascript:;">
                            <Icon className="icon" type="caret-right" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <p className="paihang_b">排行榜<span>共100首</span></p>
                        <ul className="mod_song_list">
                            {/* <li className="song_list_item">
                                <div className="song_list_index">
                                    <span className="song_list_num">1</span>
                                    <span className="song_list_change">
                                    <Icon className="hot" type="fire" />
                                        170%</span>
                                </div>
                                <div className="song_list_bd">
                                    <h3 className="song_list_txt">You Need To Calm Down</h3>
                                    <span className="song_list_desc">Taylor Swift</span>
                                </div>
                                <Icon className="down" type="vertical-align-bottom" />
                            </li> */}
                            {el}
                        </ul>
                    </div>
                </header>
            </div>
        )
    }
}

export default ToplistData