import Index from '../components/pages/index/index'
import ToplistData from '../components/pages/toplistData/toplistData'
import Play from '../components/pages/play/play'

const routes=[
    {
        path:'/index',
        component:Index
    },
    {
        path:'/toplistData/:id',
        component:ToplistData
    },
    {
        path:'/play/:id/:songid/:albummid/:singermid/:singer/:songName',
        component:Play
    },
    {
        path:'*',
        redirect:'/index'
    }
]
export default routes