<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;"></el-col>
		<!--列表-->
		<template>
			<el-table :data="plans" highlight-current-row v-loading="loading" style="width: 100%;">
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
						<el-button size="small" @click="handleBack(scope.$index, scope.row)">还原</el-button>
						<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
	import api from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				loading: false,
				plans: [
				],
				user: {
					userId: '',
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
			//获取用户列表
			getPlan: function () {
				this.loading = true;
				//NProgress.start();
				this.user.userId= JSON.parse(sessionStorage.getItem('user')).user_id;
				api.getRecyclePlanList(this.user).then((res) => {
					this.plans = res.data.data;
					for(let i=0;i<this.plans.length;i++){
						this.plans[i].createTime = this.parseTime(this.plans[i].createTime);
						this.plans[i].remindTime = this.parseTime(this.plans[i].remindTime);
						this.plans[i].completeTime = this.parseTime(this.plans[i].completeTime)
					}
					this.loading = false;
					//NProgress.done();
				});
			},
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    //NProgress.start();
                    let para = {id: '' };
                    para.id = row.id;
                    console.log(para);
                    api.removePlan(para).then((res) => {
                        this.getPlan();
                        this.loading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        message: '未知错误',
                        type: 'info'
                    });
                    this.loading = false;
                });
            },
            handleBack: function (index, row) {
                    this.loading = true;
                    //NProgress.start();
                    let para = {id: '' };
                    para.id = row.id;
                    console.log(para);
                    api.reductionPlan(para).then((res) => {
                        this.getPlan();
                        this.loading = false;
                        //NProgress.done();
                        this.$message({
                            message: '恢复成功',
                            type: 'success'
                        });
                }).catch(() => {
                        this.$message({
                            message: '未知错误',
                            type: 'info'
                        });
                        this.loading = false;
                });
            }
		},
		mounted() {
			this.getPlan();
		}
	};

</script>

<style scoped>

</style>