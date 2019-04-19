<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="12">
                <div id="chartLabel" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartLevel" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartStatus" style="width:100%; height:400px; margin-left: 400px"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import api from '../../api/api';
    export default {
        data() {
            return {
                chartLabel: null,
                chartLevel: null,
                chartStatus:null,
                labelX:[],
                labelSer:[],
                levelX:[],
                levelSer:[],
                statusX:[],
                statusSer:[]
            }
        },

        methods: {
            drawLabelChart() {
                let para = {user_id:JSON.parse(sessionStorage.getItem('user')).user_id};
                api.getLastWeekLabel(para).then(( {data}) => {
                    for(var key in data.data) {
                        this.labelX.push(key);
                        this.labelSer.push({value:Number(data.data[key]),name:key});
                    }
                    this.chartLabel = echarts.init(document.getElementById('chartLabel'));
                    this.chartLabel.setOption({
                        title: {
                            text: '计划标签',
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: this.labelX,
                        },
                        series: [
                            {
                                name: '计划标签',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: this.labelSer,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    });
                });
            },
            drawLevelChart() {
                let para = {user_id:JSON.parse(sessionStorage.getItem('user')).user_id};
                api.getLastWeekLevel(para).then(( {data}) => {
                    for(var key in data.data) {
                        this.levelX.push(key);
                        this.levelSer.push({value:Number(data.data[key]),name:key});
                    }
                    this.chartLevel = echarts.init(document.getElementById('chartLevel'));
                    this.chartLevel.setOption({
                        title: {
                            text: '计划等级',
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: this.levelX,
                        },
                        series: [
                            {
                                name: '计划等级',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: this.levelSer,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    });
                });
            },
            drawStatusChart() {
                let para = {user_id:JSON.parse(sessionStorage.getItem('user')).user_id};
                api.getLastWeekStatus(para).then(( {data}) => {
                    for(var key in data.data) {
                        this.statusX.push(key);
                        this.statusSer.push({value:Number(data.data[key]),name:key});
                    }
                    console.log(this.statusX);
                    console.log(this.statusSer);

                    this.chartStatus = echarts.init(document.getElementById('chartStatus'));
                    this.chartStatus.setOption({
                        title: {
                            text: '计划完成度',
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: this.statusX,
                        },
                        series: [
                            {
                                name: '计划等级',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: this.statusSer,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    });
                });
            },
            drawCharts() {
                this.drawLabelChart()
                this.drawLevelChart()
                this.drawStatusChart()
            },
        },

        mounted: function () {
            this.drawCharts()
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
