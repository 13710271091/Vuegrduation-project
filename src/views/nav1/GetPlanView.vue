<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form ref="selectForm"  :model="selectForm" :inline="true"  >
                <el-form-item prop="completeTime">
                    <el-select v-model="selectForm.completeTime" placeholder="计划期限" style=" width: 120px">
                        <el-option label="日" value="1"></el-option>
                        <el-option label="周" value="7"></el-option>
                        <el-option label="月" value="30"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="planStatus">
                    <el-select v-model="selectForm.planStatus" placeholder="计划进度" style=" width: 120px">
                        <el-option label="未开始" value="未开始"></el-option>
                        <el-option label="完成部分" value="完成部分"></el-option>
                        <el-option label="已完成" value="已完成"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getPlans('selectForm')">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <template>
            <el-table :data="plans" highlight-current-row v-loading="loading" style="width: 100%;">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column type="index" width="80">
                </el-table-column>
                <el-table-column prop="planLabel" label="标签" width="120" sortable>
                </el-table-column>
                <el-table-column prop="planLevel" label="等级" width="100"  sortable>
                </el-table-column>
                <el-table-column prop="planStatus" label="状态" width="100" sortable>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="170" sortable>
                </el-table-column>
                <el-table-column prop="remindTime" label="提醒时间" width="170" sortable>
                </el-table-column>
                <el-table-column prop="completeTime" label="截止时间" width="170" sortable>
                </el-table-column>
                <el-table-column prop="planContent" label="内容" min-width="300" sortable>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">回收</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="计划等级" prop="planLevel">
                    <el-select v-model="editForm.planLevel" placeholder="请选择等级">
                        <el-option label="特急" value="特急"></el-option>
                        <el-option label="紧急" value="紧急"></el-option>
                        <el-option label="常规" value="常规"></el-option>
                        <el-option label="从容" value="从容"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计划分类" prop="planLabel">
                    <el-select v-model="editForm.planLabel" placeholder="请选择分类">
                        <el-option label="教学" value="教学"></el-option>
                        <el-option label="科研" value="科研"></el-option>
                        <el-option label="学生工作" value="学生工作"></el-option>
                        <el-option label="客户沟通" value="客户沟通"></el-option>
                        <el-option label="会议" value="会议"></el-option>
                        <el-option label="娱乐" value="娱乐"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="截止时间" >
                    <el-col :span="8">
                        <el-form-item label="" label-width="0px" prop="date1">
                            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date1" style="width: 80%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1"></el-col>
                    <el-col :span="10">
                        <el-form-item label="" label-width="0px" prop="date2">
                            <el-time-select  type="date" v-model="editForm.date2" :picker-options="{
								start: '09:00',
								step: '00:30',
								end: '22:00'
							  }" placeholder="选择时间">
                            </el-time-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="提醒时间"  >
                    <el-col :span="8">
                        <el-form-item label="" label-width="0px" prop="date3">
                            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date3" style="width: 80%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1"></el-col>
                    <el-col :span="10">
                        <el-form-item label="" label-width="0px" prop="date4">
                            <el-time-select type="date" v-model="editForm.date4" :picker-options="{
							start: '09:00:00',
							step: '00:30:00',
							end: '22:00:00'
						  }" placeholder="选择时间">
                            </el-time-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="完成状态" prop="planStatus" >
                    <el-radio-group v-model="editForm.planStatus">
                        <el-radio label="未开始"></el-radio>
                        <el-radio label="完成部分"></el-radio>
                        <el-radio label="已完成"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="计划内容" prop="planContent">
                    <el-input type="textarea" v-model="editForm.planContent"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script>
    import util from '../../common/js/util'
    import api from '../../api/api';
    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                plans: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                //编辑界面数据
                editForm: {
                    userId: JSON.parse(sessionStorage.getItem('user')).user_id,
                    date1:'',
                    date2:'',
                    date3:'',
                    date4:'',
                    planContent: '',
                    planLabel: '',
                    planLevel: '',
                    planStatus:'',
                    completeTime:'',
                    createTime:'',
                    remindTime: '',
                    plan_recycle:false
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                },
                selectForm:{
                    completeTime:'',
                    planStatus:'',
                    userId:''
                }

            }
        },
        methods: {
            //转换时间戳函数
            parseTime:function(timeStamp){
                let time = new Date(timeStamp),
                    y = time.getFullYear(),
                    m = time.getMonth() + 1,
                    d = time.getDate();
                return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + time.toTimeString().substr(0, 8);
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取计划列表
            getPlans(formName) {
                this.listLoading = true;
                this.selectForm.userId=JSON.parse(sessionStorage.getItem('user')).user_id;
                let opt = this.selectForm;
                console.log(this.planForm);
                api.getPlanListPage(opt).then((res) => {
                    this.plans = res.data.data;
                    for(let i=0;i<this.plans.length;i++){
                        this.plans[i].createTime = this.parseTime(this.plans[i].createTime);
                        this.plans[i].remindTime = this.parseTime(this.plans[i].remindTime);
                        this.plans[i].completeTime = this.parseTime(this.plans[i].completeTime)
                    }
                    this.$refs[formName].resetFields();
                });
                this.listLoading = false;
            },
            //删除
            handleDel: function (index, row) {
                    this.listLoading = true;
                    debugger
                    let para = {id: '' };
                    para.id = row.id;
                    api.removeUser(para).then(() => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '回收成功',
                            type: 'success'
                        });
                        this.getPlans();
                    });
                    this.listLoading = false;
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                };
            },
            //编辑
            editSubmit: function () {
                console.log(this.editForm);
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let para = Object.assign({}, this.editForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            editUser(para).then((res) => {
                                this.editLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            addUser(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { ids: ids };
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            this.getPlans()
        }
    }

</script>

<style scoped>

</style>