export default {
  path: 'apply',
  component: () => import('@/views/foreground/apply'),
  name: 'Apply',
  meta: {
    title: '报名'
  },
  children: [
    {
      path: 'add',
      component: () => import('@/views/foreground/apply/add'),
      name: 'AddStudent',
      meta: {
        title: '新增学员'
      },
      hidden: true
    },
    {
      path: 'pay/:id',
      component: () => import('@/views/foreground/apply/pay'),
      name: 'Pay',
      meta: {
        title: '结算内容'
      },
      hidden: true
    },
    {
      path: 'payConfirm/:id',
      component: () => import('@/views/foreground/apply/components/PayConfirm'),
      name: 'PayConfirm',
      meta: {
        title: '结算确认'
      },
      hidden: true
    },
    {
      path: 'refundView/:id',
      component: () => import('@/views/foreground/apply/components/RefundView'),
      name: 'RefundView',
      meta: {
        title: '退费查看'
      },
      hidden: true
    },
    {
      path: 'refund/:id',
      component: () => import('@/views/foreground/apply/refund'),
      name: 'Refund',
      meta: {
        title: '退费'
      },
      hidden: true
    },
    {
      path: 'changeClass/:id',
      component: () =>
        import('@/views/foreground/apply/components/ChangeClass'),
      name: 'ChangeClass',
      meta: {
        title: '转班'
      },
      hidden: true
    },
    {
      path: 'curriculumAdjust/:id',
      component: () =>
        import('@/views/foreground/apply/components/CurriculumAdjust'),
      name: 'CurriculumAdjust',
      meta: {
        title: '调课'
      },
      hidden: true
    },
    {
      path: 'student',
      component: () => import('@/views/foreground/apply/info'),
      name: 'StudentInfo',
      meta: {
        title: '学员详情',
        breadcrumb: false
      },
      hidden: true,
      children: [
        {
          path: 'classQuery/:id',
          component: () =>
            import('@/views/foreground/apply/components/ClassQuery'),
          name: 'ClassQuery',
          meta: {
            title: '班级查询',
            animation: false
          }
        },
        {
          path: 'attendClass/:id',
          component: () =>
            import('@/views/foreground/apply/components/AttendClass'),
          name: 'AttendClass',
          meta: {
            title: '在读班级',
            animation: false
          }
        },
        {
          path: 'finishedClass/:id',
          component: () =>
            import('@/views/foreground/apply/components/FinishedClass'),
          name: 'FinishedClass',
          meta: {
            title: '已结课班级',
            animation: false
          }
        },
        {
          path: 'payFinish/:id',
          component: () =>
            import('@/views/foreground/apply/components/PayFinish'),
          name: 'PayFinish',
          meta: {
            title: '支付完成',
            animation: false
          }
        },
        {
          path: 'changeClassRecord/:id',
          component: () =>
            import('@/views/foreground/apply/components/ChangeClassRecord'),
          name: 'ChangeClassRecord',
          meta: {
            title: '转班记录',
            animation: false
          }
        },
        {
          path: 'curriculumAdjustRecord/:id',
          component: () =>
            import('@/views/foreground/apply/components/CurriculumAdjustRecord'),
          name: 'CurriculumAdjustRecord',
          meta: {
            title: '调课记录',
            animation: false
          }
        },
        {
          path: 'refundRecord/:id',
          component: () =>
            import('@/views/foreground/apply/components/RefundRecord'),
          name: 'refundRecord',
          meta: {
            title: '退费记录',
            animation: false
          }
        },
        {
          path: 'repairRecord/:id',
          component: () =>
            import('@/views/foreground/apply/components/RepairRecord'),
          name: 'RepairRecord',
          meta: {
            title: '候补记录',
            animation: false
          }
        },
        {
          path: 'applyOtherPayment/:id',
          component: () =>
            import('@/views/foreground/apply/components/ApplyOtherPayment'),
          name: 'ApplyOtherPayment',
          meta: {
            title: '其他收费',
            animation: false
          }
        },
        {
          path: 'order/:id',
          component: () => import('@/views/foreground/apply/components/order'),
          name: 'Order',
          meta: {
            title: '订单',
            animation: false
          }
        },
        {
          path: 'unfinishedOrder/:id',
          component: () =>
            import('@/views/foreground/apply/components/UnfinishedOrder'),
          name: 'UnfinishedOrder',
          meta: {
            title: '未完成订单',
            animation: false
          }
        },
        {
          path: 'paymentRecord/:id',
          component: () =>
            import('@/views/foreground/apply/components/PaymentRecord'),
          name: 'PaymentRecord',
          meta: {
            title: '支付记录',
            animation: false
          }
        }
      ]
    }
  ]
}
