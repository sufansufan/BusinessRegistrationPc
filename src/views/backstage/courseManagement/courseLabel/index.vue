<template>
  <div class="course-label-box">
    <div>
      <div>
        <h3 v-for="(item, index) in labelList" :key="item.label" class="bor-tit">
          <span @click="clickLabel(index)">{{ item.label }}</span>
          <transition name="el-fade-in">
            <i :class="{'act-bg': item.status}"/>
          </transition>
        </h3>
      </div>
    </div>
    <div>
      <div>
        <div class="list">
          <el-input v-model.trim="labelAdd" placeholder="请输入内容"/>
          <i class="el-icon-plus act-color" @click="addLabel"/>
        </div>
      </div>
      <div>
        <div v-for="(item, index) in dataList" :key="item.id" class="list">
          <el-input :ref="'editRef' + index" v-model.trim="item.label" :disabled="item.disabledStatus" placeholder="请输入内容" @blur="inputBlur(index,item)"/>
          <i class="el-icon-delete act-color" @click="deleteLabel(item)"/>
          <i class="el-icon-edit act-color" @click="editLabel(index)"/>
          <i class="el-icon-arrow-up act-color" @click="sortClick(item, index, 'rise')"/>
          <i class="el-icon-arrow-down act-color" @click="sortClick(item, index, 'drop')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { editSysDict, deleteSysDict, editSysDictSort } from '@/api/backstage/courseManagement'
export default {
  data() {
    return {
      labelAdd: '',
      dataList: [],
      labelList: [
        {
          label: '年份',
          status: true,
          type: 'particular_year'
        },
        {
          label: '季节',
          status: false,
          type: 'season'
        },
        {
          label: '期别',
          status: false,
          type: 'periods'
        },
        {
          label: '年级',
          status: false,
          type: 'grade'
        },
        {
          label: '科目',
          status: false,
          type: 'subject'
        },
        {
          label: '类别',
          status: false,
          type: 'project_type'
        },
        {
          label: '班型',
          status: false,
          type: 'class_type'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['particular_year', 'season', 'periods', 'grade', 'subject', 'project_type', 'class_type']).then(() => {
      this.dataList = JSON.parse(JSON.stringify(this.constant.particular_year))
      this.dataList = JSON.parse(JSON.stringify(this.dataList)).map(item => {
        item.disabledStatus = true
        return item
      })
    })
  },
  methods: {
    clickLabel(index) {
      this.labelList.map(item => {
        item.status = false
      })
      this.labelList[index].status = true
      this.labelAdd = ''
      this.dataList = this.constant[this.labelList[index].type]
      this.dataList.map(item => {
        item.disabledStatus = true
      })
    },
    editLabel(index) {
      this.dataList = JSON.parse(JSON.stringify(this.dataList))
      this.dataList[index].disabledStatus = false
      this.$nextTick(() => {
        this.$refs['editRef' + index][0].focus()
      })
    },
    addLabel() {
      const { type } = this.labelList.find(item => (item.status === true))
      this.labelAdd ? this.saveLabel({ type, label: this.labelAdd, id: '' }) : this.$message.warning('请输入内容')
    },
    inputBlur(index, val) {
      this.dataList[index].disabledStatus = true
      this.saveLabel(val)
    },
    saveLabel(val) {
      const { type, label, id } = val
      const params = {
        id,
        type,
        label
      }
      editSysDict({ sysDict: params }).then(res => {
        this.$store.dispatch('getDict', type)
        if (id) {
          this.$message.success('编辑成功')
        } else {
          this.$message.success('新增成功')
          this.labelAdd = ''
          this.getConstantList(type)
        }
      })
    },
    getConstantList(type = 'particular_year') {
      this.$store.dispatch('getDict', type).then(res => {
        this.dataList = JSON.parse(JSON.stringify(this.constant[type]))
        this.dataList = JSON.parse(JSON.stringify(this.dataList)).map(item => {
          item.disabledStatus = true
          return item
        })
      })
    },
    deleteLabel(item) {
      const { id: ids, type } = item
      this.$confirm('是否删除改数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSysDict({ ids }).then(res => {
          this.$message.success('删除成功')
          this.getConstantList(type)
        })
      })
    },
    sortClick(val, index, type) {
      const { sort, id, type: types } = val
      if (sort === 1) {
        this.$message.warning('该数据已经在最顶部')
        return
      }
      if (type === 'drop') {
        if (!(this.dataList[index + 1])) {
          this.$message.warning('该数据已经在最底部')
          return
        }
      }
      const dataSort = type === 'rise' ? this.dataList[index - 1].sort : this.dataList[index + 1].sort
      const dataId = type === 'rise' ? this.dataList[index - 1].id : this.dataList[index + 1].id
      const [newSort, oldSort] = [sort, dataSort]
      const sysDicts = [
        { id, sort: oldSort },
        { id: dataId, sort: newSort }
      ]
      editSysDictSort({ sysDicts }).then(res => {
        this.$message.success('排序成功')
        this.getConstantList(types)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.course-label-box{
  display: flex;
  & > div:first-child{
    width: 5%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  & > div:last-child{
    margin-left: 20px;
    & > div {
      & > div{
        margin-bottom: 0px;
      }
      .el-input{
        width: 250px;
      }
    }
    & > div:first-child{
      display: flex;
      .el-icon-plus{
        margin-left: 20px;
        line-height: 32px;
        cursor: pointer;
      }
    }
  }
  .bor-tit{
    width: 52px;
    cursor: pointer;
    text-align: center;
  }
  .act-bg{
    width: 52px;
    height: 12px
  }
  .list{
    margin: 10px 0px;
    display: flex;
    & > i {
      width: 30px;
      height: 30px;
      cursor: pointer;
      background: #f2f2f2;
      border-radius: 50%;
      text-align: center;
      line-height: 30px;
      margin-left: 20px;
    }
  }
}
</style>
<style lang="scss">
.course-label-box{
  .list{
    .el-input.is-disabled .el-input__inner{
      background-color: #ffffff;
      color: #5a5e66;
    }
  }
}
</style>
