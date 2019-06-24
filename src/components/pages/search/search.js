import React, { Component } from 'react'
import { SearchBar, WhiteSpace } from 'antd-mobile';
import './search.css'
import { search } from '../../../common/js/API'
import { Icon } from 'antd'

class Search extends Component {
    constructor(props) {
        super();
        this.state = {
            val: '',
            show: true,
            focus: true,
            aspan: [
                "周笔畅 新歌", "华语原创十大金曲", "周杰伦", "COMING HOME", "父亲写的散文诗", "17岁", "陪你到世界之巅",
                "RED VELVET", "林俊杰"
            ],
            songList: []
        }
    }
    clearV(e) {
        var val = this.state.val;
        val = e;
        this.setState({
            val
        })
        // console.log(val)
    }
    inputOnFocus() {
        this.setState({
            focus: false
        })
    }

    startsearch(e) {
        var id =e
        this.setState({
            focus:false,
            show:true
        })
        this.$http({
            url:search+id
        }).then(d=>{
            this.setState({
                songList:d.data.data.songList
            })
        })
    }
    change(cal) {
        var val = this.state.val;
        this.setState({
            val: cal,
            focus: false,
            show: true
        })

        this.$http({
            url: search + cal
        }).then(d => {
            // console.log(d)
            this.setState({
                songList: d.data.data.songList
            })
        })
    }
    componentDidMount() {
        this.setState({
            show: false
        })
    }
    toplay(id,songid,albummid,singermid,singer,songName){
        this.props.history.push('/play/'+id+'/'+songid+'/'+albummid+'/'+singermid+'/'+singer+'/'+songName)
    }
    render() {
        var aspan = this.state.aspan.map((item, index) => {
            return <span className="tag_s" key={index} onClick={() => { this.change(item) }}>{item}</span>
        })
        var songs = this.state.songList.map(item => {
            return <li key={item.songMid} onClick={()=>{this.toplay(item.songMid,item.songId,item.albumMid,item.singer[0].singerMid,item.singer[0].singerName,item.songName)}}>
                <Icon className="font" type="customer-service" />
                <div className="dassa">
                    <h3>{item.songName}</h3>
                    {item.singer.map(item=>{
                        return <span key={item.singerMid}>{item.singerName}&nbsp;&nbsp;</span>
                    })}                   
                </div>
            </li>
        })
        return (
            <div className="search">
                <SearchBar
                    value={this.state.val}
                    placeholder="搜索歌曲、歌单、专辑"
                    onChange={(e) => { this.clearV(e) }}
                    // onBlur={() => { this.inputOnBlur() }}
                    onFocus={() => { this.inputOnFocus() }}
                    onSubmit={(e) => { this.startsearch(e) }}
                    ref={ref => this.manualFocusInst = ref}
                />
                <WhiteSpace />
                <div className={this.state.focus ? "mod_search_result" : "mod_search_result_focus"}>
                    <h3 className="result_tit">热门搜索</h3>
                    <div className="result_tags">
                        {aspan}
                    </div>
                </div>
                <div className={this.state.show ? "mod_search_content" : "mod_search_hid"}>
                    <ul className="search_content">
                        {songs}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Search