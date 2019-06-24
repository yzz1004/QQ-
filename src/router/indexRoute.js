import Tuijian from '../components/pages/tuijian/tuijian'
import Top from '../components/pages/top/top'
import Search from '../components/pages/search/search.js'

const routes=[
    {
        path:'/index/tuijian',
        component:Tuijian
    },
    {
        path:'/index/top',
        component:Top
    },
    {
        path:'/index/search',
        component:Search
    },
    {
        path:'*',
        redirect:'/index/tuijian'
    }
]

export default routes