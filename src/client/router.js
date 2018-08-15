import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import Ls from "./services/ls";

import AdminUsers from './views/admin/users/List.vue';
import AdminEditUser from './views/admin/users/Edit.vue';
import AdminCreateUser from './views/admin/users/Create.vue';
import ManagerDashboard from './modules/user/_components/dashboard.vue';
import ManagerChat from './modules/user/_components/chat.vue';

import LayoutBasic from "./views/layouts/LayoutBasic.vue";

import LayoutLogin from "./views/layouts/LayoutLogin.vue";

import Login from "./modules/auth/_components/Login.vue";
import NotFoundPage from "./views/errors/404.vue";

const routes = [
    {
        path: '/', redirect: '/login'
    },
    {
        path: '/admin', component: LayoutBasic,
        meta: { requiresAuth: true },
        children: [
            { path: 'users', component: AdminUsers, name: 'adminUsersList' }, 
            { path: 'users/create', component: AdminCreateUser, name: 'adminUserCreate' },
            { path: 'users/:id', component: AdminEditUser, name: 'adminUserEdit' },
        ]
    },
    {
        path: '/manager', component: LayoutBasic,
        meta: { requiresAuth: true },
        children: [
            { path: '', component: ManagerDashboard, name: 'managerDashboard' },
            { path: ':accountId', component: ManagerChat, name: 'managerChat' },
        ]
    },

  {
    path: "/",
    component: LayoutLogin,
    children: [
      { path: "login", component: Login, name: "login" },
      // { path: "register", component: Register, name: "register" }
    ]
  },

  { path: "*", component: NotFoundPage }
];

const router = new VueRouter({
  routes,
  mode: "history",
  linkActiveClass: "active"
});


router.beforeEach((to, from, next) => {
  let auth = false;
  let token = Ls.get('auth.token');
  if(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    auth = store.dispatch('auth/check', token);
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth) {
    

    if($(window).width() < 769){
      $('#sidebar').removeClass('show');
    } 
    next({ path: '/login'});
  } else {
    store.dispatch('global/startLoading', null, { root: true });
    

    if($(window).width() < 769){
      $('#sidebar').removeClass('show');
    }
    next();
  }
});

export default router;
