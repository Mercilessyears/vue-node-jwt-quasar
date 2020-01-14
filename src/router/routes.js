
const routes = [
  {
    path: '/',
    component: () => import('layouts/SpaceLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/register', component: () => import('pages/Register.vue') }
    ]
  },
  {
    path: '/workbench',
    component: () => import('layouts/SpaceWorkbenchLayout.vue'),
    redirect: '/workbench/index',
    children: [
      { path: 'index', component: () => import('pages/workbench/WorkIndex.vue') },
      { path: 'project', component: () => import('pages/workbench/Project.vue') },
      { path: 'members', component: () => import('pages/workbench/Members.vue') },
      { path: 'cloudfiles', component: () => import('pages/workbench/CloudFiles.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
