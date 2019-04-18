import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import CreatePlan from './views/nav1/CreatePlan.vue'
import GetRecycleView from './views/nav1/GetRecycleView.vue'
import echarts from './views/charts/echarts.vue'
import GetPlanView from './views/nav1/GetPlanView.vue'
import GetOverDueView from './views/nav1/GetOverDueView.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/register',
        component: Register,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '计划管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/createPlan', component: CreatePlan, name: '创建计划' },
            { path: '/getPlanView', component: GetPlanView, name:'计划视图' },
            { path: '/getOverDueView', component: GetOverDueView, name:'过期计划' },
            { path: '/getRecycleView', component: GetRecycleView, name:'回收站' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '上周计划报表',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: '报表' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;