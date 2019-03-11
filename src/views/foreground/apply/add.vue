<template>
  <div class="add-student-box">
    <div class="add-student-box-left">
      <div class="go-back">
        <el-button type="goback" icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
      </div>
      <h2 class="title">基本信息</h2>
      <el-form
        ref="student"
        :model="student"
        :rules="rules"
        label-position="top"
        label-width="80px"
        size="midium"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="student.name" style="width: 217px;" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="性别" prop="whetherBoy">
          <el-select v-model="student.whetherBoy" placeholder="请选择性别">
            <el-option
              v-for="(item, index) in $store.state.app.sex"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-select v-model="student.grade" placeholder="请选择年级">
            <el-option
              v-for="item in constant.grade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="常用电话" prop="mobile">
          <el-input v-model="student.mobile" style="width: 317px;" placeholder="请输入常用电话"/>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            v-model="student.birthday"
            type="date"
            value-format="timestamp"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item style="display: none" label="就读学校" prop="oldAttendClassName">
          <div class="inline">
            <el-select v-model="student.oldAttendClassId" placeholder="请选择学校">
              <el-option
                v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-input
              v-model="student.oldAttendClassName"
              style="width: 250px;"
              placeholder="请输入内容"
            />
          </div>
        </el-form-item>
        <el-form-item label="科目入学成绩">
          <achievement :entry-score.sync ="student.entryScore" @achievement="v => student.entryScore = v" />
        </el-form-item>
        <el-form-item label="课程顾问" prop="courseCounselorId">
          <el-select v-model="student.courseCounselorId" placeholder="请选择课程顾问">
            <el-option
              v-for="item in courseCounselorList"
              :key="item.id"
              :label="item.loginName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="submit-btn">
            <el-button type="primary" style="width: 300px;" @click="saveStudent">保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="add-student-box-right">
      <h2 class="title">更多信息</h2>
      <el-form :model="student" label-position="top" label-width="80px" size="midium">
        <el-form-item label="父亲姓名">
          <el-input v-model="student.fatherName" style="width: 217px;" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="父亲电话">
          <el-input
            v-model="student.fatherMobile"
            style="width: 317px; margin-right: 10px;"
            placeholder="请输入父亲电话"
          />
          <el-checkbox :disabled="!student.fatherMobile" v-model="student.fatherSmsEnable">接收短信通知</el-checkbox>
        </el-form-item>
        <el-form-item label="母亲姓名">
          <el-input v-model="student.motherName" style="width: 217px;" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="母亲电话">
          <el-input
            v-model="student.motherMobile"
            style="width: 317px; margin-right: 10px;"
            placeholder="请输入母亲电话"
          />
          <el-checkbox :disabled="!student.motherMobile" v-model="student.motherSmsEnable">接收短信通知</el-checkbox>
        </el-form-item>
        <el-form-item label="了解渠道">
          <el-select v-model="student.knownChannle" placeholder="请选择了解渠道">
            <el-option
              v-for="item in constant.known_channle"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="student.email" style="width: 317px;" placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="student.idcardno" style="width: 317px;" placeholder="请输入身份证号"/>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="student.address" placeholder="请输入联系地址"/>
        </el-form-item>
        <el-form-item label="备注">
          <el-input :rows="4" v-model="student.remarks" type="textarea" placeholder="请输入备注"/>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Achievement from '@/views/components/Achievement'
import { getSysUserList } from '@/api/configure/userManagement'
import { addStudent, getStudentInfo } from '@/api/backstage/studentInfoManagement'
export default {
  name: 'AddStudent',
  components: {
    Achievement
  },
  data() {
    return {
      student: {
        name: '',
        whetherBoy: true,
        grade: '',
        mobile: '',
        birthday: '',
        oldAttendClassId: '',
        oldAttendClassName: '',
        courseCounselorId: '',
        fatherName: '',
        fatherMobile: '',
        fatherSmsEnable: '',
        motherName: '',
        motherMobile: '',
        motherSmsEnable: '',
        knownChannle: '',
        email: '',
        idcardno: '',
        address: '',
        remarks: '',
        entryScore: []
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        grade: [{ required: true, message: '请选择年级', trigger: 'change' }],
        mobile: [
          { required: true, min: 11, max: 11, message: '请输入11位常用电话', trigger: 'blur' },
          { pattern: /^\d+$/, message: '请输入正确的电话号码', trigger: 'blur' }
        ],
        birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }]
      },
      courseCounselorList: []
    }
  },
  computed: {
    ...mapGetters(['constant', 'userInfo'])
  },
  created() {
    this.$store.dispatch('getConstant', ['grade', 'known_channle', 'subject'])
    this.getCourseCounselor()
    this.$nextTick(() => {
      this.student.courseCounselorId = this.userInfo.id
    })
    const { path, params: { id }} = this.$route
    if (path.includes('editStudent')) {
      this.getStudentInfo(id)
    }
  },
  methods: {
    getCourseCounselor() {
      getSysUserList({
        status: true,
        campusId: this.userInfo.role[0].id
      }).then(res => {
        this.courseCounselorList = res.data.list
      })
    },
    saveStudent() {
      this.$refs.student.validate().then(() => {
        const params = {
          Loading: true,
          ...this.student,
          userCampusIds: this.userInfo.role[0].campusIds,
          studentSource: 1
        }
        params.entryScore.map(item => {
          delete item.label
          delete item.value
          return item
        })
        addStudent(params).then(() => {
          this.student.id ? this.$message.success('编辑学生成功') : this.$message.success('添加学生成功')
          this.$router.go(-1)
        })
      }).catch(() => { })
    },
    getStudentInfo(id) {
      getStudentInfo({ id }).then(({ data }) => {
        const { studentInfo } = data
        const { studentInfo: { entryScore }} = data
        this.student = studentInfo
        this.student.birthday = new Date(this.student.birthday).getTime()
        this.student.entryScore = entryScore.map(item => {
          item.value = item.subjectId
          item.label = this.constant.subject.find(v => v.value === item.subjectId).label
          return item
        })
      })
    }
  }
}
</script>
<style lang="scss">
.add-student-box {
  .el-form-item {
    margin-bottom: 15px !important;
    .el-form-item__label {
      line-height: 28px;
      padding: 0 !important;
      color: #000;
    }
  }
}
</style>
<style lang="scss" scoped>
.add-student-box {
  display: flex;
  justify-content: space-between;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 22px;
    height: calc(100% + 22px);
    background: linear-gradient(to right, #f1f1f1, #f3f5f7, #f1f1f1);
    margin-left: -11px;
  }
  &-left,
  &-right {
    width: calc(50% - 33px);
  }
  .go-back {
    position: absolute;
  }
  .title {
    text-align: center;
    margin-top: 5px;
  }
  .submit-btn {
    text-align: center;
    padding-top: 30px;
  }
}
</style>
