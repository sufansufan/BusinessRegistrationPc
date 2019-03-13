<template>
  <div :class="className" :style="{height:height,width:width === '100%' ? 'calc(100vw - 330px)': width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    chartData: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      chart: null,
      yAxisData: [],
      seriesData: []
    }
  },
  watch: {
    chartData: {
      handler(val) {
        this.yAxisData = []
        this.seriesData = []
        const { list } = this.chartData
        list && list.map(item => {
          this.yAxisData.push(item.date)
          this.seriesData.push(item.predictIncomeConfirm)
        })
        this.initChart()
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      if (this.$el) {
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: 20,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true,
            show: true
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: this.yAxisData
          },
          series: [
            {
              name: '预估确认收入',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: this.seriesData
            }
          ]
        })
      }
    }
  }
}
</script>
