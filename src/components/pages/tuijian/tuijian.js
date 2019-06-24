import React, { Component } from 'react'
import { Carousel } from 'antd'
import { Icon } from 'antd'
import './tuijian.css'
import { tuijian } from '../../../common/js/API'

class Tuijian extends Component {
    constructor(props) {
        super();
        this.state = {
            arr: [],
            list: []
        }
    }
    componentDidMount() {
        this.$http({
            url: tuijian,
        }).then(d => {
            console.log(d)
            this.setState({
                arr: d.data.data.slider,
                list: d.data.data.radioList
            })
        })
    }
    render() {
        var el = this.state.arr.map(item => {
            return <img src={item} key={item} alt="" />
        })
        var Ali = this.state.list.map(item => {
            return (<li className="list_media" key={item.id}>
                <img className="img" src={item.picUrl} alt="" />
                {/* <Icon  type="play-circle" /> */}
                <Icon className="player" type="play-circle" />
                <p>{item.title}</p>
            </li>)
        })
        return (
            <div>
                <Carousel autoplay>
                    {el}
                </Carousel>
                <div className="list">
                    <h2 className="list_tit">电台</h2>
                    <ul className="list_wrap">
                        {/* <li className="list_media">
                            <img className="img" src="http://y.gtimg.cn/music/photo/radio/track_radio_199_13_1.jpg" alt="" />
                            <Icon className="play" type="play-circle" />
                            <p>热歌</p>
                        </li>*/}

                        {Ali}
                    </ul>
                </div>
                <div className="mod_footer">
                    <a className="comp" href="https://y.qq.com/?ADTAG=myqq&nomobile=1#type=index">查看电脑版网页</a>
                    <img className="logo" src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt="" />
                    <p>Copyright © 1998 - 2019 Tencent. All Rights Reserved.</p>
                    <p>联系电话：0755-86013388 QQ群：55209235</p>
                </div>
                
            </div>
        )
    }
}

export default Tuijian