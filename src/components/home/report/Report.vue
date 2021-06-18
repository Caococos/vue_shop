<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-06-18 10:11:59
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-06-18 11:18:26
-->
<template>
  <div class='report'>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 第二步 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>

</template>

<script>
// 第一步 导入echarts
import * as echarts from 'echarts';
import { requestReportData } from 'network/report';
export default {
  name: 'report',
  data() {
    return {
      echartsData: {},
      // 需要合并的数据
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  mounted() {

  },
  created() {
    this.getReportData()
  },
  methods: {
    getReportData() {
      requestReportData().then(res => {
        if (res) {
          this.echartsData = res.data
        }
      })
    }
  },
  watch: {
    // 从服务器请求的数据要慢于DOM节点渲染完成的速度，所以这里监听返回的数据再调用echaets
    echartsData: function () {
      if (Object.keys(this.echartsData).length !== 0) {
        //  第三步 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 第四步 指定图表的配置项和数据
        // assign是浅拷贝，所以不能修改this.echartsData中对象引用的属性
        Object.assign(this.options, this.echartsData)
        // 第五步 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.options);
      }
    }
  }
}
</script>

<style scoped>
</style>