/* Layout */
import Layout from '@/views/layout/Layout'
import apply from './apply'

export default {
  path: '/foreground',
  component: Layout,
  redirect: '/foreground/apply',
  name: 'Foreground',
  meta: {
    title: '前台系统',
    icon: 'foreground'
  },
  children: [
    apply,
    {
      path: 'otherPayment',
      component: () => import('@/views/foreground/otherPayment'),
      name: 'OtherPayment',
      meta: {
        title: '其他收费'
      },
      children: [
        {
          path: 'otherPay/:id',
          component: () => import('@/views/foreground/otherPayment/pay'),
          name: 'OtherPay',
          meta: {
            title: '支付'
          },
          hidden: true
        }
      ]
    },
    {
      path: 'queryClass',
      component: () => import('@/views/foreground/queryClass'),
      name: 'QueryClass',
      meta: {
        title: '班级查询'
      },
      children: [
        {
          path: 'classInfo/:id',
          component: () => import('@/views/foreground/queryClass/classInfo'),
          name: 'ClassInfo',
          meta: {
            title: '班级详情'
          },
          hidden: true
        },
        {
          path: 'teacherInfo/:id',
          component: () => import('@/views/foreground/queryClass/teacherInfo'),
          name: 'TeacherInfo',
          meta: {
            title: '教师详情'
          },
          hidden: true
        }
      ]
    },
    {
      path: 'repairManagement',
      component: () => import('@/views/foreground/repairManagement'),
      name: 'RepairManagement',
      meta: {
        title: '候补管理'
      }
    },
    {
      path: 'queryTurnClass',
      component: () => import('@/views/foreground/queryTurnClass'),
      name: 'QueryTurnClass',
      meta: {
        title: '转班查询'
      }
    },
    {
      path: 'queryTurnCourse',
      component: () => import('@/views/foreground/queryTurnCourse'),
      name: 'QueryTurnCourse',
      meta: {
        title: '调课查询'
      }
    },
    {
      path: 'signManagement',
      component: () => import('@/views/foreground/signManagement'),
      name: 'SignManagement',
      meta: {
        title: '签到管理'
      },
      children: [
        {
          path: 'signList',
          component: () => import('@/views/foreground/signManagement'),
          name: 'SignManagementInfo',
          meta: {
            title: '签到管理'
          },
          children: [
            {
              path: 'signInfo/:id',
              component: () =>
                import('@/views/foreground/signManagement/signInfo'),
              name: 'SignInfo',
              meta: {
                title: '签到'
              },
              hidden: true
            }
          ]
        },
        {
          path: 'record',
          component: () => import('@/views/foreground/signManagement/record'),
          name: 'SignRecord',
          meta: {
            title: '签到记录'
          }
        }
      ]
    },
    {
      path: 'businessQuery',
      component: () => import('@/views/components/Container'),
      redirect: 'Overview',
      name: 'BusinessQuery',
      meta: {
        title: '业务查询'
      },
      children: [
        {
          path: 'overview',
          component: () =>
            import('@/views/foreground/businessQuery/paymentRefundOverview'),
          name: 'PaymentRefundOverview',
          meta: {
            title: '缴退费总览'
          }
        },
        {
          path: 'query',
          component: () =>
            import('@/views/foreground/businessQuery/businessQuery'),
          name: 'BusinessVolumeQuery',
          meta: {
            title: '业务量查询'
          }
        },
        {
          path: 'queryList',
          component: () =>
            import('@/views/foreground/businessQuery/businessQueryList'),
          name: 'BusinessVolumeQueryList',
          meta: {
            title: '业务量查询列表'
          }
        },
        {
          path: 'classRoom',
          component: () =>
            import('@/views/foreground/businessQuery/classroomUtilizationRate'),
          name: 'ClassroomUtilizationRate',
          meta: {
            title: '教室利用率'
          }
        },
        {
          path: 'refundQuery',
          component: () =>
            import('@/views/foreground/businessQuery/refundQuery'),
          name: 'RefundQuery',
          meta: {
            title: '退费查询'
          }
        },
        {
          path: 'campusReconciliation',
          component: () =>
            import('@/views/foreground/businessQuery/campusReconciliation'),
          name: 'CampusReconciliation',
          meta: {
            title: '校区对账'
          }
        }
      ]
    }
  ]
}
