<template>
    <el-form :model="registerForm" :rules="rules" ref="registerForm" label-position="left" label-width="0px" class="register-container">
        <h2 class="title">注册</h2>
        <el-form-item prop="email">
            <el-input type="email" v-model="registerForm.email" auto-complete="off" placeholder="邮件"></el-input>
        </el-form-item>
        <el-form-item prop="user_password">
            <el-input type="password" v-model="registerForm.user_password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="registerForm.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="handleRegister('registerForm')" >注册</el-button>
            <router-link to='login'><label>已有账号</label></router-link>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
    </el-form>
</template>

<script>
    import api from '../api/api';
    export default {
        name: "register",
        data() {
            // 密码安全性要求
            let validatePass1 = (rule, value, callback) => {
                // 6-16位, 数字, 字母, 字符至少包含两种, 同时不能包含中文和空格
                let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$){8,16}$/;
                if (!reg.test(value)) {
                    callback(new Error('密码长度需8-16位'))
                } else {
                    callback()
                }
            };
            // 监测两次密码是否相同
            let validatePass2 = (rule, value, callback) => {
                value === '' ? callback(new Error('请再次输入密码')) :
                    value !== this.registerForm.user_password ? callback(new Error('两次输入密码不一致!')) :
                        callback()
            };
            return {
                registerForm: {
                    email: '',
                    user_password: '',
                    checkPass: ''
                },
                rules: {
                    email: [{
                            required: true,
                            message: '请输入邮箱地址',
                            trigger: 'blur'
                        },
                        {
                            type: 'email',
                            message: '请输入正确的邮箱地址',
                            trigger: 'blur'
                        }
                    ],
                    user_password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                        {
                            validator: validatePass1,
                            trigger: 'blur'
                        }
                    ],
                    checkPass: [{
                        required: true,
                        message: '请再次输入密码',
                        trigger: 'blur'
                    },
                        {
                            validator: validatePass2,
                            trigger: 'blur'
                        }
                    ]
                },
            };
        },
        methods: {
            handleRegister(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let opt = this.registerForm;
                        api.userRegister(opt).then(({
                                                        data
                                                    }) => {
                            if (data.code === 0) {
                                alert("注册成功,账号:"+data.data)
                                //  Register 设计为了 Login 的组件，所以成功跳转时刷新一次页面
                                this.$router.push('/login')
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: '此邮箱已被使用'
                                })
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    } else {
                        console.log('Error Submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .register-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
</style>