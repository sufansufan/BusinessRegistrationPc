import checkPermission from '@/utils/permission'
import { pickerOptions, deepClone } from '@/utils'
import pagination from './pagination'
export default {
  mixins: [pagination],
  data() {
    return {
      count: 0,
      loading: true,
      resetSearchCriteria: {},
      quickOptions: {
        shortcuts: pickerOptions
      }
    }
  },
  mounted() {
    this.select && this.initSearchCriteria()
  },
  methods: {
    checkPermission,
    initSearchCriteria() {
      // 深拷贝默认搜索条件，以便重置搜索
      this.resetSearchCriteria = deepClone(this.select)
    },
    resetSearch() {
      // 重置搜索条件
      this.select = deepClone(this.resetSearchCriteria)
      if (this.$refs.multiCascader) {
        this.$refs.multiCascader.clearLabels()
      }
    },
    BFD(fetchFn, loadName = 'loading') {
      this[loadName] = true
      return fetchFn
        .then(() => {
          this[loadName] = false
        })
        .catch(() => {
          this[loadName] = false
        })
    },
    renderStateTag(state, isVNode = false) {
      // 返回状态的Tag标签
      const stateList = {
        success: ['审核通过', '启用', '已付款', '已支付', '已报名', '上架'],
        info: ['草稿', '申请中', '未签到'],
        warning: ['待审核', '打款中'],
        danger: ['审核不通过', '停用', '错误', '打款失败', '不通过', '下架']
      }
      let tagType = ''
      for (const i in stateList) {
        if (stateList[i].includes(state)) {
          tagType = i
        }
      }
      if (isVNode) {
        return state
          ? this.$createElement(
            'el-tag',
            {
              attrs: {
                type: tagType
              }
            },
            state
          )
          : ''
      }
      return `<span class="el-tag el-tag--${tagType} el-tag--small">${state}</span>`
    },
    monthRangeBlur(vm, data) {
      // 月份多选插件光标处理
      let refs = []
      data
        ? (refs = ['startMonth' + data, 'endMonth' + data])
        : (refs = ['startMonth', 'endMonth'])
      const nextRef = refs.filter(item => item !== vm.name)
      vm.value && !this.$refs[nextRef].value && this.$refs[nextRef].focus()
    },
    parseDate(date, first, last, obj = 'select') {
      if (!date) date = ['', '']
      this[obj][first] = date[0]
      this[obj][last] = date[1]
    },
    getLastVal(data, field, obj = 'select') {
      if (!data) data = ['']
      this[obj][field] = data[data.length - 1]
    }
  }
}
