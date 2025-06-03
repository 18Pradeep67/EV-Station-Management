import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SignupView from '@/views/SignupView.vue';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import ChargingStations from '@/views/user/ChargingStations.vue';
import MapView from '@/views/user/MapView.vue';
import AdminStationsView from '@/views/admin/AdminStationsView.vue';
import AdminMapView from '@/views/admin/AdminMapView.vue';
import { jwtDecode } from 'jwt-decode';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView,meta:{layout:'public'} },
    { path: '/signup', name: 'signup', component: SignupView, meta:{layout:'public'} },
    { path: '/login', name: 'login', component: LoginView, meta:{layout:'public'} },
    { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true, layout:'loggedIn' } },
    { path: '/chargers', name: 'chargers', component: ChargingStations, meta: { requiresAuth: true, layout:'loggedIn' } },
    { path: '/map', name: 'map', component: MapView, meta: { requiresAuth: true, layout:'loggedIn' } },
    {
      path: '/admin/stations',
      name: 'adminstations',
      component: AdminStationsView,
      meta: { requiresAuth: true, requiresAdmin: true, layout:'loggedIn' }
    },
    {
      path: '/admin/map',
      name: 'adminmap',
      component: AdminMapView,
      meta: { requiresAuth: true, requiresAdmin: true, layout:'loggedIn' }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next('/login');
    }

    if (to.matched.some(record => record.meta.requiresAdmin)) {
      const tokenWithBearer = localStorage.getItem('token');
      const token = tokenWithBearer?.startsWith('Bearer ') ? tokenWithBearer.split(' ')[1] : null;
      const decoded = token ? jwtDecode(token) : null;

      if (decoded?.isAdmin !== true) {
        return next('/');
      }
    }
  }

  next();
});

export default router;
