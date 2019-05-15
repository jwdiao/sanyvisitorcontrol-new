import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const router = new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/resetpwd',
      name: 'resetpwd',
      component: () => import('../views/login/resetpwd.vue')
    },
    {
      // path: '/twodimension/:id',
      path: '/twodimension',
      name: 'twodimension',
      component: () => import('../views/twoDimension/index.vue')
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('../views/layout/layout.vue'),
      children: [
        {
          path: '/',
          redirect: '/index'
        },
        {
          path: '/index',
          name: 'index',
          component: () => import('../views/index/index.vue'), // 首页
          meta: ['首页']
        },
        {
          path: '/nopage',
          name: 'nopage',
          component: () => import('../views/emptyPage/noDataPage.vue'), // 正在建设中...
        },
        {
          path: '/template',
          name: 'template',
          component: () => import('../views/common/template.vue'), // 模板页
        },
        // ===========================我的信息（人脸图谱）模块 start========================
        {
					path: '/myPhotoInput',
					name: 'myPhotoInput',
					component: () => import('../views/myInfo/myPhotoInput.vue'),//我的照片录入(全部员工)
					meta: ['我的信息', '我的照片录入']
				},

        // ===========================我的信息（人脸图谱）模块 end========================
        // ===========================访客管理模块 start========================
        {
          path: '/myVisitor',
          name: 'myVisitor',
          component: () => import('../views/visitorManage/myVisitor/myVisitor.vue') ,// 我的访客信息（全部员工）
					meta: ['访客管理', '我的访客信息']
        },
        {
          path: '/visitHistoryRecord',
          name: 'visitHistoryRecord',
          component: () => import('../views/visitorManage/visitHistoryRecord.vue') ,// 拜访历史记录（全部员工）
					meta: ['访客管理', '拜访历史记录']
        },
        {
          path: '/tempVisitInput',
          name: 'tempVisitInput',
          component: () => import('../views/visitorManage/tempVisitInput.vue') ,// 临时拜访录入（门岗）
					meta: ['访客管理', '临时拜访录入']
        },
        {
          path: '/bookVisitSearch',
          name: 'BookVisitSearch',
          component: () => import('../views/visitorManage/bookVisitSearch/bookVisitSearch.vue') ,// 预约访客查询（门岗）
					meta: ['访客管理', '预约访客查询']
        },
        {
          path: '/endVisitSearch',
          name: 'EndVisitSearch',
          component: () => import('../views/visitorManage/endVisitSearch/endVisitSearch.vue') ,// 结束拜访查询（门岗）
					meta: ['访客管理', '结束拜访查询']
        },
        // ===========================访客管理模块 end========================
        // ===========================基础管理模块 start========================
        {
          path: '/parkService',
          name: 'ParkService',
          component:() => import('../views/basicManage/parkService/parkService.vue') ,// 园区维护管理（系统管理页）
          meta: ['基础管理', '园区维护管理']
        },
        {
          path: '/empowerment',
          name: 'Empowerment',
          component: () => import('../views/basicManage/empowerment/empowerment.vue') ,// 园区组织授权(系统管理页)
          meta: ['基础管理', '园区组织授权']
        },
        {
          path: '/externalStaffAccount',
          name: 'ExternalStaffAccount',
          component:() => import('../views/basicManage/externalStaffAccount/index.vue') ,// 员工账号管理（门岗）
          meta: ['基础管理', '员工账号管理']
        },
        {
          path: '/outsideOrg',
          name: 'outsideOrg',
          component: () => import('../views/basicManage/outsideOrg.vue'),// 外部组织机构
          meta: ['基础管理', '园区组织机构']
        },
        {
          path: '/parkBrake',
          name: 'ParkBrake',
          component: () => import('../views/basicManage/parkBrake.vue') ,// 园区闸机（系统管理页）
          meta: ['基础管理', '园区闸机']
        },

        // ===========================基础管理模块 end========================
        // ===========================系统管理模块 start========================
        {
          path: '/photoInputSearch',
          name: 'photoInputSearch',
          component: () => import('../views/systemManage/photoInputSearch.vue'),//照片录入查询（管理）
          meta: ['系统管理', '照片录入查询']
        },
				{
					path: '/userManage',
					name: 'userManage',
					component: () => import('../views/systemManage/userManage.vue'),//用户管理
					meta: ['系统管理', '用户管理']
				},
				{
					path: '/roleManage',
					name: 'roleManage',
					component: () => import('../views/systemManage/roleManage.vue'),//角色管理(系统管理页)
					meta: ['系统管理', '角色管理']
				},
				{
					path: '/userRole',
					name: 'userRole',
					component: () => import('../views/systemManage/userRole.vue'),//用户角色(系统管理页)
					meta: ['系统管理', '用户角色']
				},
				{
					path: '/manageEmpowerment',
					name: 'manageEmpowerment',
					component: () => import('../views/systemManage/manageEmpowerment.vue'),//管理授权(系统管理页)
					meta: ['系统管理', '管理授权']
        },

        {
          path: '/parkPorter',
          name: 'ParkPorter',
          component: () => import('../views/systemManage/parkPorter/parkPorter.vue') ,// 园区门卫（系统管理页）
          meta: ['系统管理', '园区门卫']
        },
        // ===========================系统管理模块 end========================
        // ===========================园区管理模块 start========================
        {
          path: '/externalStaffManage',
          name: 'ExternalStaffManage',
          component:() => import('../views/parkManage/externalStaffManage/index.vue') ,// 园区员工管理 (门岗)
          meta: ['园区管理', '园区员工管理']
        },

        {
          path: '/parkCarManage',
          name: 'parkcarmanage',
          component: () => import('../views/parkManage/parkCarMangage/parkCarManage.vue'),//园区车辆管理(系统管理页)
          meta: ['园区管理', '园区车辆管理']
        }
        // ===========================园区管理模块 end========================
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path === '/login'|| to.path === '/resetpwd' || to.name === 'twodimension'){
    next()
  }else{
    if(sessionStorage.username){
      next()
    }else{
      next({path:'/login'})
    }
  }
})

export default router
