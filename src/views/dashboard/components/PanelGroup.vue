<template>
  <el-row :gutter="22" class="panel-group">
    <el-col
      v-for="(chart, index) in chartList"
      :key="index"
      :xs="24"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div class="card-panel">
        <div>
          <img :src="setImg(imgList[index].img)">
          <div>
            <p>
              <count-num :num="chart.number" :to-fixed="imgList[index].toFixed" class="price-font"/>
              {{ imgList[index].suffix }}
            </p>
            <p>{{ chart.name }}</p>
          </div>
        </div>
        <div>
          <el-progress
            :stroke-width="10"
            :show-text="false"
            :percentage="+(chart.yearOnYearGrowth.replace('%',''))"
          />
          <div>
            <span>同比增长</span>
            <span class="num">{{ chart.yearOnYearGrowth }}</span>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { getFirstStatistics } from '@/api'
export default {
  data() {
    return {
      imgList: [
        {
          img: 'zongshou',
          suffix: '元'
        },
        {
          img: 'tuifei',
          suffix: '元'
        },
        {
          img: 'zaidu',
          suffix: '人',
          toFixed: 0
        },
        {
          img: 'queren',
          suffix: '元'
        }
      ],
      chartList: []
    }
  },
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    setImg(name) {
      return require(`@/assets/theme/${this.theme}-theme/images/${name}.png`)
    },
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    fetchData() {
      getFirstStatistics({
        adminOrganIds: this.userInfo.currentRoleId
      }).then(res => {
        this.chartList = res.data.list
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  .card-panel-col {
    margin-bottom: 22px;
  }
  > div {
    &:last-child {
      .card-panel > div > img {
        width: 46px;
        height: 42px !important;
      }
    }
  }
  .card-panel {
    height: 148px;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    padding: 25px 25px 0;
    position: relative;
    > div:first-child {
      display: flex;
      align-items: flex-start;
      > img {
        height: 46px;
        margin-right: 10px;
      }
      p {
        margin: 0;
        font-size: 12px;
        span {
          font-size: 20px !important;
          font-weight: bold;
        }
        &:last-child {
          padding-top: 5px;
          color: #7d7d7d;
        }
      }
    }
    > div:last-child {
      position: absolute;
      left: 25px;
      bottom: 15px;
      width: calc(100% - 50px);
      > div:last-child {
        padding-top: 12px;
        display: flex;
        justify-content: space-between;
        > span {
          font-size: 14px;
          &:first-child {
            color: #b8b8b8;
          }
        }
      }
    }
  }
}
</style>
