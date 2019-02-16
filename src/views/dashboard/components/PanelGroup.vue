<template>
  <el-row :gutter="22" class="panel-group">
    <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div>
          <img :src="setImg('zongshou')">
          <div>
            <p>
              <count-num :num="423325522430" class="price-font"/>元
            </p>
            <p>总收入</p>
          </div>
        </div>
        <div>
          <el-progress :stroke-width="10" :show-text="false" :percentage="40"/>
          <div>
            <span>同比增长</span>
            <span class="num">40%</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div>
          <img :src="setImg('tuifei')">
          <div>
            <p>
              <count-num :num="423325522430" class="price-font"/>元
            </p>
            <p>总退费</p>
          </div>
        </div>
        <div>
          <el-progress :stroke-width="10" :show-text="false" :percentage="20"/>
          <div>
            <span>同比增长</span>
            <span class="num">20%</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div>
          <img :src="setImg('zaidu')">
          <div>
            <p>
              <count-num :num="123231" class="price-font"/>人
            </p>
            <p>在读学员总数</p>
          </div>
        </div>
        <div>
          <el-progress :stroke-width="10" :show-text="false" :percentage="40"/>
          <div>
            <span>同比增长</span>
            <span class="num">40%</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div>
          <img :src="setImg('queren')">
          <div>
            <p>
              <count-num :num="423325522430" class="price-font"/>元
            </p>
            <p>确定收入</p>
          </div>
        </div>
        <div>
          <el-progress :stroke-width="10" :show-text="false" :percentage="40"/>
          <div>
            <span>同比增长</span>
            <span class="num">40%</span>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['theme'])
  },
  methods: {
    setImg(name) {
      return require(`@/assets/theme/${this.theme}-theme/images/${name}.png`)
    },
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
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
