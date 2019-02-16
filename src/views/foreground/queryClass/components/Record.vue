<template>
  <div class="tabs-record-box">
    <comm-table v-loading="loading" :data="dataList" :columns="columns"/>
  </div>
</template>

<script>
import tables from '@/mixin/tables'
import { getChangedRecordList } from '@/api/foreground/queryClass'
import { parseTime } from '@/utils'
export default {
  mixins: [tables],
  data() {
    return {
      dataList: [],
      columns: [
        { label: '操作时间', prop: 'updateDate' },
        { label: '操作人', prop: 'updateByName' },
        { label: '操作', prop: 'remarks' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.BFD(getChangedRecordList({ classId: this.$route.params.id }).then(res => {
        this.dataList = res.data.list.map(item => {
          item.updateDate = parseTime(item.updateDate)
          return item
        })
      }))
    }
  }
}
</script>

<style scoped>
</style>
