import React, { Component } from 'react'
import { play, lrc, albumImg } from '../../../common/js/API'
import './play.css'
import { Icon } from 'antd'

class Play extends Component {
    constructor(props) {
        super()
        this.state = {
            songs: [],
            // 歌词
            geci: [],
            time: '',
            zanting: false,
            play: true,
            num:0,
            imgurl:''
        }
    }
    componentDidMount() {
        var id = this.props.match.params.id
        var songid = this.props.match.params.songid
        var singer =this.props.match.params.singer
        var songName =this.props.match.params.songName
        var albummid = this.props.match.params.albummid
        var singermid = this.props.match.params.singermid

        this.setState({
            singer,
            songName
        })
        this.$http({
            url: play + id
        }).then(d => {
            // console.log(d)
            this.setState({
                songs: d.data.data
            })
        });
        this.$http({
            url: lrc + songid
        }).then(d => {
            // console.log(d)
            var dd = d.data.data.lyric
            // console.log(this.state.geci)            
            var arr = dd.split('[换行]');
            var newArr = [];
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split(']');
                var key = arr2[0].substr(1);
                var value = arr2[1];
                if(value==''){
                    continue
                }
                key = key.substr(0, 5);
                var json = {
                    key,
                    value
                }
                newArr.push(json)
            }
            this.setState({
                geci: newArr
            })
            // console.log(this.state.geci)
           
        })
        this.$http({
            url: albumImg + albummid + '/' + singermid
        }).then(d => {
            console.log(d)
            this.setState({
                imgurl:d.data.data.albumImgUrl
            })
        })
    }
    zanting() {
        this.setState({
            play: true
        })           
        var audio =this.refs.audio 
         if(!audio.paused){
            audio.pause()
        }               
    }
    goplay(){
        var audio = this.refs.audio
        this.setState({
            play: false
        })
        audio.play() 
    }
    play() {
                
        // console.log(this.state.geci)
        var lyricScroll =this.refs.lyricScroll
        var audio = this.refs.audio
        
        if(!audio.paused){
           this.setState({
               play:false
           })
        }
        var currentTime = audio.currentTime
        var minute=Math.floor(currentTime/60)<10?'0'+Math.floor(currentTime/60):Math.floor(currentTime/60);
        var second=Math.floor(currentTime%60)<10?'0'+Math.floor(currentTime%60):Math.floor(currentTime%60);
        var time=minute+":"+second;//00:04
        for(var i=0;i<this.state.geci.length;i++){
            if(this.state.geci[i].key===time){
                this.setState({
                    num:i,
                    time:time
                })
                break
            }
        }
        lyricScroll.style.top=(-(this.state.num-2)) *0.5 + "rem"
    }
  
    back() {
        this.props.history.go(-1)
    }
    render() {
        // console.log(this.state.geci)
        var el = this.state.geci.map((item, index) => {
            return <p key={index} time={item.key} className={this.state.time===item.key?"select":""}>{item.value}</p>
        })
        var dd = this.state.play ? <Icon onClick={() => { this.goplay() }} className="bofang" type="play-circle" /> : <Icon onClick={() => {
            this.zanting()
        }} className="zanting" type="pause-circle" />
        
        return (
            <div>
                <header className="play">
                    <img className="img" src="https://y.gtimg.cn/music/common/upload/t_playsong_ad/1207759.png?max_age=2592000" alt="" />
                    <p className="title">千万正版音乐  海量无损曲库</p>
                    <span onClick={() => { this.back() }} className="back"><Icon type="left" />返回</span>
                </header>
                <div className="song_info">
                    <div className="song_info_hd">
                        <h2 className="song_info_tit">{this.state.songName}</h2>
                        <h3 className="song_info_singer">{this.state.singer}</h3>
                    </div>
                    <div className="song_cont">
                        
                        <div className="lyric_wrap">
                            <div className="lyric_bd">
                                <div className="lyric_scroll" ref="lyricScroll">
                                    {el}
                                </div>

                            </div>
                            <div className="chakan_more"><p>查看完整歌词 ></p></div>
                        </div>
                        <div className="bofang_qi">
                            <span className="mv">MV</span>
                            {dd}
                            <Icon className="heart" type="heart" />
                            <audio onTimeUpdate={()=>{this.play()}} src={this.state.songs[0]} ref="audio" autoPlay>

                            </audio>
                        </div>

                    </div>
                </div>
                <div className="down_song"><a href="jacascript:;">下载歌曲</a></div>
                <div className="bg">
                    <img src={this.state.imgurl} alt="" />
                </div>

            </div>
        )
    }
}

export default Play