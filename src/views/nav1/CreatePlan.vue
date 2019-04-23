<template>
	<el-form ref="planForm" :model="planForm" :rules="rules2" label-width="120px"  style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="计划等级" prop="planLevel">
			<el-select v-model="planForm.planLevel" placeholder="请选择等级" >
				<el-option label="特急" value="特急"></el-option>
				<el-option label="紧急" value="紧急"></el-option>
				<el-option label="常规" value="常规"></el-option>
				<el-option label="从容" value="从容"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="计划分类" prop="planLabel">
			<el-select v-model="planForm.planLabel" placeholder="请选择分类">
				<el-option label="教学" value="教学"></el-option>
				<el-option label="科研" value="科研"></el-option>
				<el-option label="行程" value="行程"></el-option>
				<el-option label="学生工作" value="学生工作"></el-option>
				<el-option label="客户沟通" value="客户沟通"></el-option>
				<el-option label="会议" value="会议"></el-option>
				<el-option label="娱乐" value="娱乐"></el-option>
                <el-option label="其他" value="其他"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="计划截止时间" >
			<el-col :span="8">
				<el-form-item label="" label-width="0px" prop="date1">
					<el-date-picker type="date" placeholder="选择日期" v-model="planForm.date1" style="width: 80%;"></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col class="line" :span="1"></el-col>
			<el-col :span="10">
				<el-form-item label="" label-width="0px" prop="date2">
					<el-time-select  type="date"
							v-model="planForm.date2"
							:picker-options="{
								start: '09:00',
								step: '00:30',
								end: '22:00'
							  }"
							placeholder="选择时间">
					</el-time-select>
				</el-form-item>
			</el-col>
		</el-form-item>
		<el-form-item label="计划提醒时间"  >
			<el-col :span="8">
				<el-form-item label="" label-width="0px" prop="date3">
					<el-date-picker type="date" placeholder="选择日期" v-model="planForm.date3" style="width: 80%;"></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col class="line" :span="1"></el-col>
			<el-col :span="10">
				<el-form-item label="" label-width="0px" prop="date4">
					<el-time-select type="date"
							v-model="planForm.date4"
							:picker-options="{
							start: '09:00',
							step: '00:30',
							end: '22:00'
						  }"
							placeholder="选择时间">
					</el-time-select>
				</el-form-item>
			</el-col>
		</el-form-item>
		<el-form-item label="计划完成状态" prop="planStatus" >
			<el-radio-group v-model="planForm.planStatus">
				<el-radio label="未开始"></el-radio>
				<el-radio label="完成部分"></el-radio>
				<el-radio label="已完成"></el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="计划内容" prop="planContent">
			<el-input type="textarea" v-model="planForm.planContent"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit('planForm')" >立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import api from '../../api/api';
	export default {
		name: "planForm",
		data() {
			return {
				planForm: {
					userId: JSON.parse(sessionStorage.getItem('user')).user_id,
					date1:'',
					date2:'',
					date3:'',
					date4:'',
					planContent: '',
					planLabel: '行程',
					planLevel: '常规',
					planStatus:'未开始',
					completeTime:'',
					createTime:'',
					remindTime: '',
					plan_recycle:false
				},
				rules2: {
					date1: [
						{  required: true, message: '请输入日期',type:'date', trigger: 'blur'}
					],
					date2: [
						{ required: true, message: '请选择时间', trigger: 'blur'},
					],
					date3: [
						{ required: true, message: '请输入日期', type:'date',trigger: 'blur'},
					],
					date4: [
						{ required: true, message: '请选择时间', trigger: 'blur'},
					],
					planContent: [
						{ required: true, message: '请输入计划内容', trigger: 'blur'},
					],
					planLabel: [
						{ required: true, message: '请选择分类', trigger: 'blur'},
					],
					planLevel: [
						{ required: true, message: '请选择等级', trigger: 'blur'},
					],
					planStatus: [
						{ required: true, message: '请选择完成状态', trigger: 'blur'},
					]
				},
			};
		},
		methods: {
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						//_this.$router.replace('/table');
						//NProgress.start();
						this.planForm.createTime = new Date().getTime();
						this.planForm.completeTime = this.planForm.date1.getTime() + this.parseTime(this.planForm.date2);
						this.planForm.remindTime = this.planForm.date3.getTime() + this.parseTime(this.planForm.date4);
						console.log(this.planForm);
						let opt = this.planForm;
						api.createUser(opt).then(( {
													  data
												  }) => {
							if (data.code === 0) {
								this.$message({
									message: '创建成功',
									type: 'success'
								});
								this.$refs[formName].resetFields()
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
							else {
								this.$message({
									type: 'info',
									message: '未知错误'
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
			},
			parseTime:function(time) {
				let str=time.split(':');
				return (Number(str[0])*60+Number(str[1]))*60*1000;
			}
		}
	}

</script>