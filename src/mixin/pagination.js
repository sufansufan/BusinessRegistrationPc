export default {
  data() {
    return {
      page: 1,
      limit: 10,
      pageSizes: [10, 30, 50, 100],
      pageLayout: 'total, sizes, prev, pager, next, jumper',
      vm: null
    }
  },
  created() {
    this.vm = this.$parent.fetchData ? this.$parent : this
    if (this.limit !== 10) this.pageSizes.splice(0, 1, this.limit)
  },
  methods: {
    handleSizeChange(val) {
      // 公共分页每页显示条数
      this.vm.limit = val
      this.vm.page = 1
      this.vm.fetchData()
    },
    handleCurrentChange(val) {
      // 公共分页页码事件
      this.vm.page = val
      this.vm.fetchData()
    }
  }
}
