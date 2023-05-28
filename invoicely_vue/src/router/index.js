import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/dashboard/Dashboard.vue'
import MyAccount from '../views/dashboard/MyAccount.vue'
import Clients from '../views/dashboard/Clients.vue'
import SignUpView from '../views/SignUpView.vue'
import LoginView from '../views/LoginView.vue'
import Client from '../views/dashboard/Client.vue'
import AddClient from '../views/dashboard/AddClient.vue'
import EditClient from '../views/dashboard/EditClient.vue'
import EditTeam from '../views/dashboard/EditTeam.vue'
import Invoices from '../views/dashboard/Invoices.vue'
import Invoice from '../views/dashboard/Invoice.vue'
import AddInvoice from '../views/dashboard/AddInvoice.vue'

// to get access from isAuthenticated
import store from '../store'

const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUpView
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta : {
      requireLogin: true
    }
  }, 
  {
    path: '/dashboard/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta : {
      requireLogin: true
    }
  }, 
  {
    path: '/dashboard/my-account/edit-team',
    name: 'EditTeam',
    component: EditTeam,
    meta : {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/clients',
    name: 'Clients',
    component: Clients,
    meta : {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/clients/:id',
    name: 'Client',
    component: Client,
    meta : {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/add',
    name: 'AddClient',
    component: AddClient,
    meta : {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/clients/:id/edit',
    name: 'EditClient',
    component: EditClient,
    meta : {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/invoices',
    name: 'Invoices',
    component: Invoices,
    meta : {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/invoices/:id',
    name: 'Invoice',
    component: Invoice,
    meta : {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/invoices/add',
    name: 'AddInvoice',
    component: AddInvoice,
    meta : {
      requireLogin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/log-in')
  } else {
    next()
  }
})

export default router
