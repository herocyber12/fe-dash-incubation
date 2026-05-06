import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from '@/stores/user'

const routes = [
    {
        path: '/login',
        component: () => import('@/view/page/KeyLogin.vue'),
        meta: { title : 'Login Incubator Dashboard'}
    },
    {
        path: '/',
        component: () => import('@/view/layout/AppLayout.vue'),
        meta: { requireAuth: true },
        children: [
            {
                path: '/dashboard',
                component: () => import('@/view/page/DashboardView.vue'),
                meta: { requireAuth: true, title : 'Incubator Dashboard'}
            },
            {
                path:'/setting',
                component: () => import('@/view/page/SettingPage.vue'),
                meta: { requireAuth: true, title : 'Incubator Dashboard - Setting'}
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({top: 0})
})

router.beforeEach((to) => {
    console.log('beforeEach', to)
    const userStore = useUserStore()

    if (to.meta.requireAuth && !userStore.isLoggin()) {
        return '/login'
    }

    if (to.path === '/login' && userStore.isLoggin()) {
        return '/dashboard'
    }
})

export default router

