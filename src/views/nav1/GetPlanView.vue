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
            <el-table :data="plans" highlight-current-row  v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
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
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量回收</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px"  ref="editForm">
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
							start: '09:00',
							step: '00:30',
							end: '22:00'
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
                plans: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
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
                this.getPlans();
            },
            //获取计划列表
            getPlans(formName) {
                this.listLoading = true;
                this.selectForm.userId=JSON.parse(sessionStorage.getItem('user')).user_id;
                let opt = this.selectForm;
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
                    api.removePlan(para).then(() => {
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
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            this.parseDate();
                            console.log(this.editForm);
                            let para = Object.assign({}, this.editForm);
                            api.editPlan(para).then(( {
                                                          data
                                                      }) => {
                                if (data.code === 0) {
                                    this.editLoading = false;
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                }
                                else if(data.code === 409) {
                                    this.$message({
                                        message: '完成时间和提醒时间必须晚于创建时间',
                                        type: 'info'
                                    })
                                }
                                else if(data.code === 411) {
                                    this.$message({
                                        message: '提醒时间必须晚于创建时间',
                                        type: 'info'
                                    })
                                }
                                this.$refs['editForm'].resetFields();
                                this.editLoading=false;
                                this.editFormVisible = false;
                                this.getPlans();
                            }).catch((err) => {
                                this.editLoading=false;
                                this.$message({
                                    message: '未知错误',
                                    type: 'error'
                                });
                            })
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //编辑框日期时间处理函数
            parseDate:function() {
               let date1 = new Date(new Date(this.editForm.completeTime).getFullYear(),new Date(this.editForm.completeTime).getMonth(),new Date(this.editForm.completeTime).getDate(),0,0,0)
               let time1 = new Date(this.editForm.completeTime).getTime()-date1.getTime();
               let date2 = new Date(new Date(this.editForm.remindTime).getFullYear(),new Date(this.editForm.remindTime).getMonth(),new Date(this.editForm.remindTime).getDate(),0,0,0)
               let time2 = new Date(this.editForm.remindTime).getTime()-date2.getTime();
                debugger
                console.log(this.editForm);
               if (this.editForm.date1 === undefined && this.editForm.date2 !== undefined) {
                    this.editForm.completeTime = date1.getTime()+ this.parseEditTime(this.editForm.date2);
               }
               if(this.editForm.date1 !== undefined && this.editForm.date2 === undefined) {
                   this.editForm.completeTime = this.editForm.date1.getTime() + time1;
               }
               if (this.editForm.date1 !== undefined && this.editForm.date2 !== undefined) {
                   this.editForm.completeTime = new Date(this.editForm.date1).getTime()+this.parseEditTime(this.editForm.date2);
               }
                if(this.editForm.date1 === undefined && this.editForm.date2 === undefined) {
                    this.editForm.completeTime = new Date(this.editForm.completeTime).getTime()
                }
                if (this.editForm.date3 === undefined && this.editForm.date4 !== undefined) {
                    this.editForm.remindTime = date2.getTime()+ this.parseEditTime(this.editForm.date4);
                }
                if(this.editForm.date3 !== undefined && this.editForm.date4 === undefined) {
                    this.editForm.remindTime = new Date(this.editForm.date3).getTime()+ time2;
                }
                if(this.editForm.date3 === undefined && this.editForm.date4 === undefined) {
                    this.editForm.remindTime = new Date(this.editForm.remindTime).getTime()
                }
                if (this.editForm.date3 !== undefined && this.editForm.date4 !== undefined) {
                    this.editForm.remindTime = new Date(this.editForm.date3).getTime()+this.parseEditTime(this.editForm.date4);
                }
                this.editForm.createTime = new Date(this.editForm.createTime).getTime();
                console.log(this.editForm);
            },
            //
            parseEditTime:function(time) {
                let str=time.split(':');
                return (Number(str[0])*60+Number(str[1]))*60*1000;
            },
            //批量删除
            batchRemove: function () {
                let ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认回收选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = { plan_ids: ids,userId: JSON.parse(sessionStorage.getItem('user')).user_id};
                    api.batchRecyclePlan(para).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: '回收成功',
                            type: 'success'
                        });
                        this.getPlans();
                    });
                }).catch(() => {
                    this.listLoading = true;
                    this.$message({
                        message: '未知错误',
                        type: 'info'
                    });
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