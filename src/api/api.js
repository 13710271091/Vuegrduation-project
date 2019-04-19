import axios from 'axios';

let base = '';

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL='http://localhost:9090'
axios.default.timeout = 5000

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json'
// axios拦截响应
instance.interceptors.response.use(response => {
    return response
}, err => {
    return Promise.reject(err)
})

export default {
    // 用户注册
    userRegister(data) {
        return instance.post('/users/register', data)
    },
    // 用户登录
    UserLogin(data) {
        return instance.post('/users/login', data)
    },
    //创建计划
    createUser(data) {
        return instance.post('/plans/createPlan', data)
    },
    // 获取用户
    getRecyclePlanList(data) {
        return instance.post('/plans/getRecycleView',data)
    },
    // 删除计划
    deletePlan(data) {
        return instance.post('/plans/deletePlan', data)
    },
    //还原计划
    reductionPlan(data) {
        return instance.post('/plans/reductionPlan', data)
    },
    //动态查询计划
    getPlanListPage(data) {
        return instance.post('/plans/dynamicQuery',data)
    },
    //回收计划
    removePlan(data) {
        return instance.post('/plans/recyclePlan',data)
    },
    //更改计划
    editPlan(data) {
        return instance.post('/plans/updatePlan',data)
    },
    //批量回收计划
    batchRecyclePlan(data) {
        return instance.post('/plans/batchRecyclePlan',data)
    },
    //获取过期计划
    getOverDuePlan(data) {
        return instance.post('/plans/getOverDuePlan',data)
    },
    //批量删除计划
    batchDeletePlan(data) {
        return instance.post('/plans/batchDeletePlan',data)
    },
    //获取报表标签
    getLastWeekLabel(data) {
        return instance.post('/charts/labelChart',data)
    },
    //获取报表等级数据
    getLastWeekLevel(data) {
        return instance.post('/charts/levelChart',data)
    },
    //获取上周完成情况数据
    getLastWeekStatus(data) {
        return instance.post('/charts/statusChart',data)
    }
}
// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
//
// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };
//
// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };
//
// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };
//
// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };
//
// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };
//
// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };