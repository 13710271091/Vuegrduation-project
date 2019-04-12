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
    getUser() {
        return instance.get('/api/user')
    },
    // 删除用户
    delUser(data) {
        return instance.post('/api/delUser', data)
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