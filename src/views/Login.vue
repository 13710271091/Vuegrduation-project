<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h2 class="title">许锦标---计划管理系统</h2>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="handleSubmit2('ruleForm2')" >登录</el-button>
      <router-link to='register'><label>注册新账号</label></router-link>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import api from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    name: 'login',
    data() {
      return {
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            //NProgress.start();
            let opt = this.ruleForm2;
            api.UserLogin(opt).then(( {
              data
            }) => {
              //NProgress.done();
              if (data.code === 0) {
                let user = {
                  user_id:this.ruleForm2.account
                }
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                debugger
                sessionStorage.setItem('user', JSON.stringify(user));
                 this.$router.push({ path: '/table' });
              }
              else if(data.code === 402){
                this.$message({
                  type: 'info',
                  message: '账号不存在'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: '密码错误'
                })
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
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
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>