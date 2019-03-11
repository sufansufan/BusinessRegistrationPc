<template>
  <div class="teacher-info-box">
    <div class="teacher-info-box-left">
      <el-button type="goback" icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
      <div class="teacher-info-box-left-info">
        <div class="head">
          <p class="head-img">
            <img :src="teacherInfo.headImgUrl">
          </p>
          <h1>{{ teacherInfo.name }}</h1>
          <p>
            <span>{{ teacherInfo.no }}</span>
            <span>{{ teacherInfo.adminOrganNames }}</span>
          </p>
        </div>
        <div class="content">
          <h5>基本信息</h5>
          <p>
            <span>授课科目</span>
            {{ teacherInfo.subjectName }}
          </p>
          <p>
            <span>岗位性质</span>
            {{ teacherInfo.postNatureName }}
          </p>
          <p>
            <span>邮箱</span>
            {{ teacherInfo.email }}
          </p>
          <h5>更多信息</h5>
          <p>
            <span>性别</span>
            {{ teacherInfo.sex ? '男' : '女' }}
          </p>
          <p>
            <span>年龄</span>
            {{ teacherInfo.age }}
          </p>
          <p>
            <span>出生年月</span>
            {{ teacherInfo.birthday }}
          </p>
          <p>
            <span>民族</span>
            {{ teacherInfo.nationName }}
          </p>
          <p>
            <span>政治面貌</span>
            {{ teacherInfo.politicalAffiliationName }}
          </p>
        </div>
      </div>
    </div>
    <div class="teacher-info-box-right">
      <div class="content">
        <h5>教师资历</h5>
        <p>
          <span>教师年限</span>
          {{ teacherInfo.teachLife }}
        </p>
        <p>
          <span>毕业院校</span>
          {{ teacherInfo.graduateSchool }}
        </p>
        <p>
          <span>专业</span>
          {{ teacherInfo.selfSubject }}
        </p>
        <p>
          <span>最高学历</span>
          {{ teacherInfo.highestEducationDegree }}
        </p>
        <p>
          <span>教师简介</span>
          <el-input
            v-model="teacherInfo.briefIntroduce"
            :rows="8"
            disabled
            type="textarea"
            placeholder="暂无内容"
          />
        </p>
        <p>
          <span>教学特点</span>
          <el-input
            v-model="teacherInfo.teachCharacter"
            :rows="8"
            disabled
            type="textarea"
            placeholder="暂无内容"
          />
        </p>
        <p>
          <span>教学成果</span>
          <el-input
            v-model="teacherInfo.teachResults"
            :rows="8"
            disabled
            type="textarea"
            placeholder="暂无内容"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getTeacherInfo } from '@/api/foreground/queryClass'
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      teacherInfo: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getTeacherInfo({ Loading: true, id: this.$route.params.id }).then(res => {
        this.teacherInfo = res.data.teacher
        const { birthday, adminOrganNames = [] } = this.teacherInfo
        this.teacherInfo.birthday = parseTime(birthday, 'y-m-d')
        this.teacherInfo.adminOrganNames = adminOrganNames.length ? adminOrganNames.join(',') : ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.teacher-info-box {
  display: flex;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 400px;
    width: 22px;
    height: calc(100% + 22px);
    background: linear-gradient(to right, #f1f1f1, #f3f5f7, #f1f1f1);
  }
  .content {
    h5 {
      font-size: 15px;
    }
    > p {
      padding-left: 30px;
      font-size: 15px;
      color: #5a5a5a;
      display: flex;
      span {
        width: 90px;
      }
    }
  }
  &-left {
    width: 378px;
    padding-right: 22px;
    &-info {
      margin-top: 22px;
      .head {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        > p {
          width: 100%;
          margin: 0;
          text-align: center;
          &.head-img {
            width: 158px;
            height: 206px;
            border: 1px solid #f2f2f2;
            overflow: hidden;
            &,
            > img {
              border-radius: 5px;
            }
            > img {
              max-height: 204px;
              padding: 1px;
            }
          }
          span:first-child {
            padding-right: 20px;
          }
        }
        > h1 {
          width: 100%;
          text-align: center;
          margin: 15px 0 10px;
        }
      }
    }
  }
  &-right {
    flex-grow: 1;
    padding-left: 44px;
    h5 {
      margin: 0;
    }
  }
}
</style>
