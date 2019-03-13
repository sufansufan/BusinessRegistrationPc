/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/finance',
  component: Layout,
  redirect: '/finance/refund',
  name: 'Finance',
  meta: {
    title: '财务',
    icon: 'configure'
  },
  children: [
    {
      path: 'incomeSituation',
      component: () => import('@/views/finance/incomeSituation'),
      name: 'IncomeSituation',
      meta: {
        title: '收入情况'
      }
    },
    {
      path: 'refundManagement',
      component: () => import('@/views/finance/refund'),
      name: 'RefundManagement',
      meta: {
        title: '退费管理'
      }
    },
    {
      path: 'financeConfirm',
      component: () => import('@/views/finance/financeConfirm'),
      name: 'FinanceConfirm',
      meta: {
        title: '财务确认'
      }
    },
    {
      path: 'signQuery',
      component: () => import('@/views/finance/signQuery'),
      name: 'SignQuery',
      meta: {
        title: '签到查询'
      }
    },
    {
      path: 'stepRegionTurnClass',
      component: () => import('@/views/finance/stepRegionTurnClass'),
      name: 'StepRegionTurnClass',
      meta: {
        title: '跨区转班'
      }
    },
    {
      path: 'rateSetting',
      component: () => import('@/views/finance/rateSetting'),
      name: 'RateSetting',
      meta: {
        title: '费率设置'
      }
    },
    {
      path: 'financeAnalysis',
      component: () => import('@/views/finance/financeAnalysis'),
      name: 'FinanceAnalysis',
      meta: {
        title: '财务分析'
      }
    },
    {
      path: 'refundAudit/:id',
      component: () => import('@/views/finance/audit'),
      name: 'RefundAudit',
      meta: {
        title: '退费审核'
      },
      hidden: true
    },
    {
      path: 'payService',
      component: () => import('@/views/finance/payService'),
      name: 'PayService',
      meta: {
        title: '收费项目'
      }
    },
    {
      path: 'payManagement',
      component: () => import('@/views/finance/pay'),
      name: 'PayManagement',
      meta: {
        title: '支付管理'
      }
    }
  ]
}
