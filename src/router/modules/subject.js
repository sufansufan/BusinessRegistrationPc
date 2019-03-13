/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/subject',
  component: Layout,
  redirect: '/subject/classOperational',
  name: 'Subject',
  meta: {
    title: '学科',
    icon: 'configure'
  },
  children: [
    {
      path: 'classOperational',
      component: () => import('@/views/subject/classOperational'),
      name: 'ClassOperational',
      meta: {
        title: '班级运营数据'
      }
    },
    {
      path: 'studentOperational',
      component: () => import('@/views/subject/studentOperational'),
      name: 'StudentOperational',
      meta: {
        title: '学员运营数据'
      }
    },
    {
      path: 'tcgAnalysis',
      component: () => import('@/views/subject/tcgAnalysis'),
      name: 'TcgAnalysis',
      meta: {
        title: '三率分析'
      }
    },
    {
      path: 'routineAnalysis',
      component: () => import('@/views/subject/routineAnalysis'),
      name: 'RoutineAnalysis',
      meta: {
        title: '常规分析'
      }
    },
    {
      path: 'discountCoupon',
      component: () => import('@/views/subject/discountCoupon'),
      name: 'DiscountCoupon',
      meta: {
        title: '优惠券管理'
      },
      children: [
        {
          path: 'add',
          component: () => import('@/views/subject/discountCoupon/add'),
          name: 'AddCouponer',
          meta: {
            title: '发放管理-新增'
          },
          hidden: true
        },
        {
          path: 'check/:id',
          component: () => import('@/views/subject/discountCoupon/check'),
          name: 'CheckCouponer',
          meta: {
            title: '发放管理-查看'
          },
          hidden: true
        }
      ]
    }
  ]
}
