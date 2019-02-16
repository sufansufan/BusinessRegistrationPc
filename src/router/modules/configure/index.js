/* Layout */
import Layout from '@/views/layout/Layout'

export default {
  path: '/configure',
  component: Layout,
  redirect: '/configure/schoolSettings',
  name: 'Configure',
  meta: {
    title: '配置',
    icon: 'configure'
  },
  children: [
    {
      path: 'schoolSettings',
      component: () => import('@/views/configure/schoolSettings'),
      name: 'SchoolSettings',
      meta: {
        title: '中小学设置'
      }
    },
    {
      path: 'pos',
      component: () => import('@/views/configure/pos'),
      name: 'PosManagement',
      meta: {
        title: 'POS机管理'
      }
    },
    {
      path: 'appAccountManagement',
      component: () => import('@/views/configure/appAccountManagement'),
      name: 'AppAccountManagement',
      meta: {
        title: 'APP账号管理'
      }
    },
    {
      path: 'operationLog',
      component: () => import('@/views/configure/operationLog'),
      name: 'OperationLog',
      meta: {
        title: '操作日志'
      }
    },
    {
      path: 'userManagement',
      component: () => import('@/views/configure/userManagement'),
      name: 'UserManagement',
      meta: {
        title: '用户管理'
      }
    },
    {
      path: 'userGroupManagement',
      component: () => import('@/views/configure/userGroupManagement'),
      name: 'UserGroupManagement',
      meta: {
        title: '用户组管理'
      }
    }
  ]
}
