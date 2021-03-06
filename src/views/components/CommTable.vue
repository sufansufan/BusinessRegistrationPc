<template>
  <div class="table-box">
    <el-table
      ref="table"
      :key="key"
      :data="data"
      :highlight-current-row="singleSelected"
      :expand-row-keys="expandList"
      :row-key="row => row.id"
      stripe
      border
      style="width: 100%"
      @current-change="(currentRow, oldCurrentRow) => $emit('selected', currentRow, oldCurrentRow)"
      @selection-change="val => $emit('multipleSelection', val)"
    >
      <template
        v-for="({label, prop, className, width, fixed, type, pre, suf, separator = '/', _renderHeader, _child, _render, index: _i}, index) in tableRow"
      >
        <el-table-column
          v-if="!_child && !type && !pre && !suf && !Array.isArray(prop) && prop !== 'operation' && type !== 'selection' && !_renderHeader && !_render"
          :key="index"
          :prop="prop"
          :class-name="className"
          :label="label"
          :type="_i ? 'index' : ''"
          :width="width || 'auto'"
          :fixed="fixed || false"
        />
        <el-table-column
          v-else-if="type === 'expand'"
          :type="type"
          :key="index"
          :label="label"
          :class-name="className"
          :width="width || 'auto'"
          :fixed="fixed || false"
        >
          <template slot-scope="{row, $index}">
            <template v-if="_render">
              {{ createNode('_render_'+$index, _render(row, $index)) }}
              <slot :name="'_render_'+$index"/>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="type === 'selection'"
          :key="index"
          :width="width || 55"
          :fixed="fixed || false"
          :type="type"
        />
        <el-table-column
          v-else
          :key="index"
          :label="label"
          :class-name="className"
          :width="width || 'auto'"
          :fixed="fixed || false"
        >
          <template slot="header" slot-scope="{row, $index}">
            {{ _renderHeader ? createNode('_render-header_'+$index, _renderHeader(row, $index)) : label }}
            <slot :name="'_render-header_'+$index"/>
          </template>
          <template slot-scope="{row, $index}">
            <template v-if="!_child">
              <template v-if="_render">
                {{ createNode('_render_'+$index, _render(row, $index)) }}
                <slot :name="'_render_'+$index"/>
              </template>
              <template v-else-if="Array.isArray(prop)">
                <span
                  v-for="(v, index) in prop"
                  :key="index"
                  :class="{'price-font': type === 'num'}"
                >{{ row[v] }}{{ index !== prop.length - 1 ? separator : '' }}</span>
              </template>
              <template v-else-if="prop === 'operation'">
                <slot :row="row"/>
              </template>
              <template v-else-if="type === 'num'">
                <span class="price-font">{{ pre }}{{ row[prop] || 0 }}{{ suf }}</span>
              </template>
              <template v-else>
                <span>{{ pre }}{{ row[prop] }}{{ suf }}</span>
              </template>
            </template>
            <template v-else>
              <div v-for="(child, index) in row[childType]" :key="child.id" class="child-list">
                <template v-if="_render">
                  {{ createNode('_render_'+index, _render(row, $index)) }}
                  <slot :name="'_render_'+index"/>
                </template>
                <template v-else-if="prop === 'selection'">
                  <el-checkbox/>
                </template>
                <template v-else-if="prop === 'operation'">
                  <slot :row="row"/>
                </template>
                <span v-else-if="!child[prop]" class="is-empty">N/A</span>
                <template v-else-if="Array.isArray(prop)">
                  <span
                    v-for="(v, index) in prop"
                    :key="index"
                    :class="{'price-font': type === 'num'}"
                  >{{ child[v] }}{{ index !== prop.length - 1 ? separator : '' }}</span>
                </template>
                <template v-else-if="type">
                  <span class="price-font">{{ pre }}{{ child[prop] }}{{ suf }}</span>
                </template>
                <template v-else :title="child[prop]">{{ child[prop] }}</template>
              </div>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-show="count"
      :page-sizes="pageSizes"
      :page-size="limit"
      :total="count"
      :current-page="page"
      :layout="pageLayout"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
      <span class="price-font">{{ pageSlot }}</span>
    </el-pagination>
  </div>
</template>

<script>
/**
 * table配置组件参数介绍：
 * props: {
 *    data 数据入参
 *    columns 配置
 *    childType  存在子列表的时候使用，该字段为子列表的字段名称，默认order
 *    count 需要分页时传入
 *    singleSelected 是否开启单选，默认false
 *    pageSlot 页码slot
 * }
 * columns: {
 *    label 表头显示名称
 *    width 宽度
 *    prop 字段名称，单字段传String,多字段传['a', 'b']
 *    separator 多字段实现分隔符，默认'/'，只在多字段生效
 *    fixed 定位
 *    type 现只有一个'num'值可以设定 用于改变数字字体
 *    pre 前缀
 *    suf 后缀
 *    index: true  索引，传入true时生效
 *    renderHeader(h, row, index) renderHeader函数
 *    render(h, row, index) render函数
 *    [
 *      {...}   子列表使用方式，内部配置同上
 *    ]
 * }
 **/
import pagination from '@/mixin/pagination'
import { deepClone } from '@/utils'
export default {
  name: 'CommTable',
  mixins: [pagination],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    childType: {
      type: String,
      default: 'order'
    },
    count: {
      type: Number,
      default: 0
    },
    singleSelected: {
      type: Boolean,
      default: false
    },
    expandList: {
      type: Array,
      default: () => []
    },
    pageSlot: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      key: 1,
      tableRow: []
    }
  },
  watch: {
    columns: {
      handler() {
        this.tableRow = deepClone(this.columns)
        this.tableRow.forEach((item, index) => {
          if (Array.isArray(item)) {
            item.forEach(item => (item._child = true))
            this.tableRow.splice(index, 1, ...item)
          }
        })
        this.tableRow.forEach((item, index) => {
          if (item.renderHeader && typeof item.renderHeader === 'function') {
            item._renderHeader = (row, index) => item.renderHeader(this.$createElement, row, index)
          }
          if (item.render && typeof item.render === 'function') {
            item._render = (row, index) => item.render(this.$createElement, row, index)
          }
        })
        this.key = this.key + 1
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    createNode(key, vnode) {
      this.$slots[key] = vnode
    },
    setCurrentRow(row) {
      this.$refs.table.setCurrentRow(row)
    }
  }
}
</script>

<style lang="scss">
.table-box {
  .price-font {
    font-size: 16px;
  }
}
</style>
<style lang="scss" scoped>
.table-box {
  .el-pagination {
    &:first-of-type {
      margin-top: 0;
    }
    .price-font {
      padding-right: 15px;
    }
  }
  > div {
    .child-list {
      height: 33px;
      line-height: 33px;
      position: relative;
      .is-empty {
        font-size: 12px;
      }
      > div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &:not(:last-child)::before {
        content: "";
        position: absolute;
        left: -10px;
        bottom: -1px;
        width: calc(100% + 20px);
        height: 1px;
        background: #eee;
      }
    }
  }
  &-title {
    &-left {
      display: flex;
      align-items: flex-start;
      .tit {
        text-align: center;
      }
    }
    &-right {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
    }
    .tit {
      margin: 0 10px 10px 0;
      padding: 0 10px;
      line-height: 33px;
      background: #eaeaea;
      border-radius: 3px;
      display: flex;
      align-items: center;
      > span:first-child {
        color: #707070;
        &:not(:only-of-type) {
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
