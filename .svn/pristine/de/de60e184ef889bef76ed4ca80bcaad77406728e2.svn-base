<template>
  <div class="add-teacher-box">
    <div class="add-teacher-box-left">
      <div class="go-back">
        <el-button type="goback" icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
      </div>
      <h2 class="title">基本信息</h2>
      <el-form ref="teacher" :model="teacher" :rules="teacherRules" label-position="top" label-width="80px" size="midium">
        <el-form-item class="fictitious-box">
          <el-upload
            :show-file-list="false"
            :on-change="imgChange"
            action=""
            accept="image/jpg,image/png,image/jpeg"
            class="teacher-uploader">
            <img v-if="teacher.headImgUrl" :src="teacher.headImgUrl" class="teacher-bg">
            <img v-else :src="uploaderBg" class="teacher-bg">
          </el-upload>
          <div class="fictitious-btn">
            <el-checkbox-button v-model="teacher.whetherFictitious" :label="true" style="width: 100%">虚拟老师</el-checkbox-button>
          </div>
        </el-form-item>

        <div class="teacher-basic-info">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="teacher.name" clearable placeholder="请输入姓名"/>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="teacher.nickName" clearable placeholder="请输入昵称"/>
          </el-form-item>
          <el-form-item label="教师编号" prop="no">
            <el-input v-model="teacher.no" clearable placeholder="请输入教师编号"/>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="teacher.mobile" clearable placeholder="请输入电话"/>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="teacher.email" clearable placeholder="请输入邮箱"/>
          </el-form-item>
          <el-form-item label="所属校区" prop="adminOrganIds">
            <ele-multi-cascader
              ref="multiCascader"
              :options="constant.campus"
              :props="{value: 'id', label: 'name', children: 'children'}"
              v-model="teacher.adminOrganIds"
              style="width: 100%;"
              placeholder="请选择所属校区"
            />
          </el-form-item>
          <el-form-item>
            <div class="level-and-hour">
              <strong>教师级别</strong>
              <strong>义务课时</strong>
            </div>
            <div class="level-and-hour level-font" >
              <strong/>
              <strong/>
            </div>
          </el-form-item>
          <el-form-item label="岗位性质" prop="postNature">
            <el-select v-model="teacher.postNature" clearable placeholder="请选择岗位性质">
              <el-option
                v-for="item in constant.teacher_post_nature"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="授课科目" prop="subject">
            <el-select v-model="teacher.subject" multiple clearable placeholder="请选择授课科目">
              <el-option
                v-for="item in constant.subject"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="teacher.sex" clearable placeholder="请选择性别">
              <el-option :value="true" label="男"/>
              <el-option :value="false" label="女"/>
            </el-select>
          </el-form-item>
          <el-form-item label="紧急联系人">
            <el-input v-model="teacher.urgentPeopleName" clearable placeholder="请输入紧急联系人"/>
          </el-form-item>
          <el-form-item label="联系人电话" prop="urgentPeopleMobile">
            <el-input v-model="teacher.urgentPeopleMobile" clearable placeholder="请输入联系人电话"/>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="teacher.detailedAddress" clearable placeholder="请输入详细地址"/>
          </el-form-item>
        </div>
      </el-form>
      <h2 class="title">更多信息</h2>
      <el-form :model="teacher" label-position="top" label-width="80px" size="midium" class="teacher-more-info">
        <el-form-item label="民族">
          <el-select v-model="teacher.nation" clearable placeholder="请选择民族">
            <el-option
              v-for="item in constant.nation_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="teacher.age" clearable placeholder="请输入年龄"/>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="teacher.birthday"
            type="date"
            placeholder="选择日期"/>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-select v-model="teacher.politicalAffiliation" clearable placeholder="请选择政治面貌">
            <el-option
              v-for="item in constant.political_affiliation_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-select v-model="teacher.maritalStatus" clearable placeholder="请选择婚姻状况">
            <el-option
              v-for="item in constant.marital_status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input v-model="teacher.ancestralHome" clearable placeholder="请输入籍贯"/>
        </el-form-item>
        <el-form-item label="户口所在地">
          <el-input v-model="teacher.registeredResidence" clearable placeholder="请输入户口所在地"/>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="teacher.idCardNo" clearable placeholder="请输入身份证号"/>
        </el-form-item>
      </el-form>
    </div>
    <div class="add-teacher-box-right">
      <h2 class="title">教师资历</h2>
      <el-form :model="teacher" label-position="top" label-width="80px" size="midium">
        <div class="teacher-seniority">
          <el-form-item label="教学年限">
            <el-input v-model="teacher.teachLife" clearable placeholder="请输入教学年限"/>
          </el-form-item>
          <el-form-item label="毕业院校">
            <el-input v-model="teacher.graduateSchool" clearable placeholder="请输入毕业院校"/>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="teacher.selfSubject" clearable placeholder="请输入专业"/>
          </el-form-item>
          <el-form-item label="最高学历">
            <el-input v-model="teacher.highestEducationDegree" clearable placeholder="请输入最高学历"/>
          </el-form-item>
        </div>
        <el-form-item label="教学简介">
          <el-input v-model="teacher.briefIntroduce" :rows="7" type="textarea" placeholder="请输入教学介绍"/>
        </el-form-item>
        <el-form-item label="教学特点">
          <el-input v-model="teacher.teachCharacter" :rows="7" type="textarea" placeholder="请输入教学特点"/>
        </el-form-item>
        <el-form-item label="教学成果">
          <el-input v-model="teacher.teachResults" :rows="7" type="textarea" placeholder="请输入教学成果"/>
        </el-form-item>
        <el-form-item>
          <div class="submit-btn">
            <el-button type="primary" style="width: 300px;" @click="saveteacher">保存</el-button>
          </div>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import uploaderBg from '@/assets/images/teacher-uploader-bg.png'
import { validatePhone, validateNumber, validateEmail } from '@/utils/validate'
import { editTeacher, getTeacherById } from '@/api/backstage/teacherManagement'
export default {
  data() {
    const phone = (rule, value, callback) => {
      if (rule.field === 'urgentPeopleMobile') {
        if (value) {
          if (!validatePhone(value)) {
            callback(new Error('请输入正确的电话'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      } else {
        if (!validatePhone(value)) {
          callback(new Error('请输入正确的电话'))
        } else {
          callback()
        }
      }
    }
    const number = (rule, value, callback) => {
      if (!validateNumber(value)) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
    const email = (rule, value, callback) => {
      if (value) {
        if (!validateEmail(value)) {
          callback(new Error('请输入正确的邮箱'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      uploaderBg,
      teacher: {
        id: '',
        name: '',
        whetherFictitious: false,
        nickName: '',
        headImgUrl: '',
        no: '',
        mobile: '',
        email: '',
        adminOrganIds: [],
        postNature: '',
        subject: [],
        sex: '',
        age: '',
        urgentPeopleName: '',
        urgentPeopleMobile: '',
        detailedAddress: '',
        nation: '',
        birthday: '',
        politicalAffiliation: '',
        maritalStatus: '',
        ancestralHome: '',
        registeredResidence: '',
        idCardNo: '',
        teachLife: '',
        graduateSchool: '',
        selfSubject: '',
        highestEducationDegree: '',
        briefIntroduce: '',
        teachCharacter: '',
        teachResults: ''
      },
      teacherRules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { min: 1, max: 30, message: '最长为30个字符', trigger: 'blur' }
        ],
        mobile: [{ required: true, validator: phone, trigger: 'blur' }],
        no: [{ required: true, validator: number, trigger: 'blur' }],
        email: [{ validator: email, trigger: 'blur' }],
        adminOrganIds: [{ required: true, message: '请选择校区', trigger: 'change' }],
        postNature: [{ required: true, message: '请选择岗位性质', trigger: 'change' }],
        subject: [{ required: true, message: '请选择科目', trigger: 'change' }],
        urgentPeopleMobile: [{ validator: phone, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['constant']),
    lastRoute() {
      return this.$route.matched.length > 3
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['subject', 'campus', 'teacher_post_nature', 'nation_type', 'political_affiliation_type', 'marital_status']).then(() => {
      const { id } = this.$route.params
      if (id) {
        this.getTeacherInfo(id)
      }
    })
  },
  methods: {
    saveteacher() {
      this.$refs.teacher.validate(valid => {
        if (valid) {
          const { adminOrganIds, subject } = this.teacher
          const params = {
            ...this.teacher
          }
          params.adminOrganIds = adminOrganIds.join(',')
          params.subject = subject.join(',')
          editTeacher({ teacher: params }).then(res => {
            this.teacher.id ? this.$message.success('编辑成功') : this.$message.success('新增成功')
            this.$router.push({ name: 'Teacher' })
          })
        } else {
          return false
        }
      })
    },
    imgChange(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片选择失败，每张图片大小不能超过 2MB,请重新选择!')
      } else {
        const reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = () => {
          this.teacher.headImgUrl = reader.result
        }
      }
    },
    getTeacherInfo(id) {
      getTeacherById({ id }).then(({ data }) => {
        this.teacher = data.teacher
        this.teacher.adminOrganIds = this.teacher.adminOrganIds.split(',')
        this.teacher.subject = this.teacher.subject.split(',')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-teacher-box{
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
  .teacher-uploader{
    width: 153px;
    height: 200px;
    margin: 0 auto;
    border-radius: 8px;
    .teacher-bg{
      width: 100%;
      height: 200px;
      display: block;
      border-radius: 8px;
    }
  }
  .teacher-more-info{
    .el-form-item:nth-of-type(7){
      width: 100%;
    }
  }
  .fictitious-box{
    position: relative;
    width: 100%;
  }
  .fictitious-btn{
    position: absolute;
    bottom: 20px;
    right: 0px;
    width: calc(33% - 10px);
  }
  .teacher-seniority{
    display: flex;
    justify-content: space-between;
    .el-form-item{
      width: calc(25% - 10px);
    }
  }
  .teacher-basic-info, .teacher-more-info{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .el-form-item{
      width: calc(33.33% - 10px);
      &:last-child{
        width: 100%;
      }
      .el-input, .el-select{
        width: 100%;
      }
      .level-and-hour{
        color: #5a5e66;
        display: flex;
        justify-content: space-between
      }
      .level-font{
        font-size: 32px;
        & > strong:last-child{
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.add-teacher-box{
  .el-checkbox-button:last-child .el-checkbox-button__inner{
    border-radius: 4px;
    width: 100%;
  }
}
</style>
