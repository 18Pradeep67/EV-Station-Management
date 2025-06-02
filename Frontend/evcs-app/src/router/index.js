import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SignupView from '@/views/SignupView.vue';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import ChargingStations from '@/views/ChargingStations.vue';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path : '/',
            name : 'home',
            component : HomeView
        },
        {
            path : '/signup',
            name : 'signup',
            component : SignupView,
        },
        {
            path : '/login',
            name : 'login',
            component : LoginView,
        },
        {
            path:'/dashboard',
            name:'dashboard',
            component : DashboardView,
        },
        {
            path:'/chargers',
            name:'chargers',
            component : ChargingStations
        }
    ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});


export default router; 