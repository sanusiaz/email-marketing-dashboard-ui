import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForgetPasswordView from '../views/ForgetPasswordView.vue'
import ContactView from '../views/ContactView.vue'
import AboutView from '../views/AboutView.vue'
import ScheduleView from '../views/Dashboard/ScheduleView.vue'

import AdminDashboardView from '../views/Dashboard/AdminDashboardView.vue'
import SettingsView from '../views/Dashboard/SettingsView.vue'
import CampaignView from '../views/Dashboard/CampaignView.vue'
import EmailListView from '../views/Dashboard/EmailListView.vue'
import SubscribersView from '../views/Dashboard/SubscribersView.vue'
import NotFoundView from '../views/NotFoundView.vue'

import LogoutComponent from '../components/Auth/LogoutComponent.vue'

import axios from 'axios'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AdminDashboardView,
    meta: {
      redirectIfAuthenticated: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      redirectIfAuthenticated: true
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutComponent,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      redirectIfAuthenticated: true
    }
  },
  {
    path: '/forget-password',
    name: 'forget-password',
    component: ForgetPasswordView,
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/dashboard/home',
    name: 'admin-dashboard',
    component: AdminDashboardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/analytics',
    name: 'admin-analytics',
    component: AdminDashboardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/surveys',
    name: 'admin-surveys',
    component: AdminDashboardView,
     meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/campaign',
    name: 'admin-campaign',
    component: CampaignView,
     meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/email-lists',
    name: 'admin-lists',
    component: EmailListView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/newsletter',
    name: 'admin-newsletter',
    component: AdminDashboardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/schedule',
    name: 'admin-schedule',
    component: ScheduleView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/settings',
    name: 'admin-settings',
    component: SettingsView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/subscribers',
    name: 'admin-subscribers',
    component: SubscribersView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})


router.beforeEach((to, from, next) => {

  // always check the user if they are still logged in after 24 hrs
  let __loggedInTimeStamp = localStorage.getItem('loggedInTimeStamp')
  let loggedInUser = localStorage.getItem('user')

  if ( __loggedInTimeStamp !== null && Math.round(new Date().getTime() / 1000) >= (JSON.parse(__loggedInTimeStamp) + 86400)  ) {
    // Remove all localstorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInTimeStamp');

    loggedInUser = null
  }
  else {
    // User is still logged in
    let __loggedInToken = localStorage.getItem('token');
    if ( __loggedInToken !== undefined ) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + __loggedInToken;
        axios.defaults.headers.common['Accept'] = 'application/json';
    }
  }

  
  const authenticatedUser = ( loggedInUser !== null ) ?? false;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const redirectIfAuthenticated = to.matched.some(record => record.meta.redirectIfAuthenticated);

  if (requiresAuth && ! authenticatedUser) next('login')
  else if (authenticatedUser && redirectIfAuthenticated) next('/dashboard/home')
  else next();
});


export default router