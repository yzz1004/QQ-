import React, { Component } from 'react'
import './top.css'
import { Icon } from 'antd'
import { top } from '../../../common/js/API'

class Top extends Component {
    constructor(props) {
        super();
        this.state = {
            topItem: [],
            songList: []
        }
    }
    componentDidMount() {
        this.$http({
            url: top
        }).then(d => {
            console.log(d)
            this.setState({
                topItem: d.data.data,
                songList: d.data.songList
            })
            console.log(this.state.topItem)
        })
    }
    toToplist(id,pic){
        // console.log(id)
        this.props.history.push("/toplistData/"+id)
    }
    render() {
        const num = number => {
            if (number >= 10000) {
                var str = '万'
                var number1 = 0
                var number2 = 0
                number1 = number / 10000
                number2 = number1.toFixed(1)
                return number2 + str
            } else {
                return number
            }
        }
        var topl = this.state.topItem.map(item => {
            return<li onClick={()=>this.toToplist(item.id)} className="topic_main" key={item.id}>
                <div>
                    <img className="img" src={item.picUrl} alt="" />
                    <span className="font">
                        <Icon type="customer-service" />
                        &nbsp;{num(item.listenCount)}</span>
                </div>
                <div className="topic_info">
                    <h3 className="title">{item.title}</h3>
                    {item.songList.map(item => {
                        return <p key={item.number}>{item.number}<span>{item.songName}</span>- {item.singerName}</p>
                    })}
                </div>
            </li>           
        })
        return (
            <div className="mod_topic">
                <ul>
                    {topl}
                </ul>
            </div>
        )
    }
}

export default Top