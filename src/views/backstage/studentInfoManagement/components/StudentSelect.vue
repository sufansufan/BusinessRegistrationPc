<template>
  <div class="student-select">
    <div slot="select" class="select-tools">
      <div>
        <div>
          <el-input v-model.trim="select.userNameAndPhone" placeholder="学员姓名/联系电话"/>
        </div>
        <div>
          <el-input v-model.trim="select.no" placeholder="学员编号"/>
        </div>
        <div>
          <el-input v-model.trim="select.oldAttendClassName" placeholder="就读学校"/>
        </div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="select.campusId"
            :props="campusProps"
            placeholder="校区"
            change-on-select
            clearable/>
        </div>
        <div>
          <el-select v-model="select.knownChannel" placeholder="了解渠道">
            <el-option
              v-for="item in constant.known_channle"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.whetherBoy" placeholder="性别">
            <el-option :value="true" label="男"/>
            <el-option :value="false" label="女"/>
          </el-select>
        </div>
        <div>
          <el-input v-model="select.idcardno" placeholder="身份证号"/>
        </div>
        <div>
          <el-date-picker
            v-model="select.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
        </div>
        <div>
          <el-button icon="el-icon-refresh">重置搜索条件</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-download">导出</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      select: {
        userCampusIds: '',
        operationType: 3,
        userNameAndPhone: '',
        no: '',
        oldAttendClassName: '',
        campusId: [],
        knownChannel: '',
        whetherBoy: '',
        idcardno: '',
        birthdayStartDate: '',
        birthdayEndDate: '',
        date: []
      },
      campusProps: {
        value: 'id',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['subject', 'campus', 'known_channle'])
    // this.select.userCampusIds = this.userInfo.role[0].campusIds
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$emit('selectChange', 'people', this.select)
    }
  }
}
</script>

<style lang="scss">
.student-select{
  .select-tools {
    > div {
      > div {
        .el-range-editor--small.el-input__inner {
          background: #f8f8f8;
          border: 1px solid #ebebeb;
          input {
            background: #f8f8f8 !important;
            &:not(:focus) {
              background: #f8f8f8 !important;
            }
          }
        }
      }

    }
  }
}
</style>
