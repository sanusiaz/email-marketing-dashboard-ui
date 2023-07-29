import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForgetPasswordView from '../views/ForgetPasswordView.vue'
import ContactView from '../views/ContactView.vue'
import AboutView from '../views/AboutView.vue'
import ScheduleView from '../views/Dashboard/ScheduleView.vue'
import ScheduleShowView from '../views/Dashboard/ScheduleShowView.vue'
import NewsLetterView from '../views/Dashboard/NewsLetterView.vue'
import NewsLetterCreateView from '../views/Dashboard/NewsLetterCreateView.vue'
import NewsLetterUpdateView from '../views/Dashboard/NewsLetterUpdateView.vue'
import NewsLetterShowView from '../views/Dashboard/NewsLetterShowView.vue'
import NewsLetterMessageView from '../views/Dashboard/NewsLetterMessageView.vue'

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
    component: HomeView,
    meta: {
      // redirectIfAuthenticated: true,
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
      requiresAuth: true,
      Applayouts: true,
      title: 'Home',
      activeSidebar: 'dashboard',
      checkSmtp: true
    }
  },
  {
    path: '/dashboard/analytics',
    name: 'admin-analytics',
    component: AdminDashboardView,
    meta: {
      requiresAuth: true,
      Applayouts: true,
      title: 'Analytics',
      activeSidebar: 'analytics',
      checkSmtp: true
    }
  },
  {
    path: '/dashboard/surveys',
    name: 'admin-surveys',
    component: AdminDashboardView,
     meta: {
      requiresAuth: true,
      Applayouts: true,
      title: 'Survey',
      activeSidebar: 'surveys',
      checkSmtp: true
    }
  },
  {
    path: '/dashboard/campaign',
    name: 'admin-campaign',
    component: CampaignView,
     meta: {
      requiresAuth: true,
      Applayouts: true,
      title: 'Campaign',
      activeSidebar: 'campaign',
      checkSmtp: true
    }
  },
  {
    path: '/dashboard/email-lists',
    name: 'admin-lists',
    component: EmailListView,
    meta: {
      requiresAuth: true,
      Applayouts: true,
      title: 'Lists',
      activeSidebar: 'lists',
      checkSmtp: true
    }
  },
  {
    path: '/dashboard/newsletter',
    name: 'admin-newsletter',
    component: NewsLetterView,
    meta: {
      requiresAuth: true,
      Applayouts: true,
      title: 'Newsletter',
      activeSidebar: 'newsletter',
      checkSmtp: true
    }
  },
  {
    path: '/dashboard/newsletter/create',
    name: 'admin-newsletter-create',
    component: NewsLetterCreateView,
    meta: {
      requiresAuth: true,
      Applayouts: true,
      title: 'Newsletter',
      activeSidebar: 'newsletter',
      checkSmtp: true
    }
  },
  {
    path: '/dashboard/newsletter/:id',
    name: 'admin-newsletter-show',
    component: NewsLetterShowView,
    meta: {
      requiresAuth: true,
      Applayouts: true,
      title: 'Newsletter',
      activeSidebar: 'newsletter',
      checkSmtp: true
    }
  },

  {
    path: '/dashboard/newsletter/update/:id',
    name: 'admin-newsletter-update',
    component: NewsLetterUpdateView,
    meta: {
      requiresAuth: true,
      Applayouts: true,
      title: 'Newsletter',
      activeSidebar: 'newsletter',
      checkSmtp: true
    }
  },

  {
    path: '/dashboard/newsletter/message/:id',
    name: 'admin-newsletter-message',
    component: NewsLetterMessageView,
    meta: {
      requiresAuth: true,
      Applayouts: false,
      checkSmtp: true
    }
  },
  {
    path: '/dashboard/schedule',
    name: 'admin-schedule',
    component: ScheduleView,
    meta: {
      requiresAuth: true,
      Applayouts: true,
      title: 'Schedule',
      activeSidebar: 'schedule',
      checkSmtp: true
    }
  },

  {
    path: '/dashboard/schedule/:id',
    name: 'admin-schedule-show',
    component: ScheduleShowView,
    meta: {
      requiresAuth: true,
      Applayouts: true,
      title: 'Schedule',
      activeSidebar: 'schedule',
      checkSmtp: true
    }
  },
  {
    path: '/dashboard/settings',
    name: 'admin-settings',
    component: SettingsView,
    meta: {
      requiresAuth: true,
      Applayouts: true,
      title: 'Settings',
      activeSidebar: 'settings',
    }
  },
  {
    path: '/dashboard/subscribers',
    name: 'admin-subscribers',
    component: SubscribersView,
    meta: {
      requiresAuth: true,
      Applayouts: true,
      title: 'Subscribers',
      activeSidebar: 'subscribers',
      checkSmtp: true
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