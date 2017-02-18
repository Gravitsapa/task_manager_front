import Vue          from 'vue'
import VueRouter    from 'vue-router'
import VueResource  from 'vue-resource'

import App          from './components/App.vue'
import MainContent  from './components/MainContent.vue'
import Login        from './components/Login.vue'
import Signup       from './components/Signup.vue'

Vue.use(VueResource);
Vue.use(VueRouter);

const API_URL = 'http://192.168.100.100:3000/';
const LOGIN_URL = API_URL + 'user_token';
const SIGNUP_URL = API_URL + 'users';

Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

export let router = new VueRouter({
  routes: [
    { path: '/', component: MainContent },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
  ]
});

export let auth = {
  user: {
    authenticated: false
  },

  login(context, creds) {
    context.$http.post(LOGIN_URL, creds).then((data) => {
      localStorage.setItem('id_token', data.body.jwt);
      this.user.authenticated = true;
      Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');
      router.push('/')
    }, (err) => {
      console.log(err);
      //context.error = err
    })
  },

  signup(context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds).then((data) => {
      localStorage.setItem('id_token', data.body.jwt);
      this.user.authenticated = true;
      Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');
      if(redirect) {
        router.replace({ path: redirect })
      }

    }, (err) => {
      console.log(err);
      //context.error = err
    })
  },

  logout() {
    localStorage.removeItem('id_token');
    this.user.authenticated = false;
    Vue.http.headers.common['Authorization'] = '';
    router.replace('/login')
  },

  checkAuth() {
    let jwt = localStorage.getItem('id_token');
    this.user.authenticated = !!jwt;
  }
};

auth.checkAuth();

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
