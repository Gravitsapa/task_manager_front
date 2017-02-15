import Vue          from 'vue'
import VueRouter    from 'vue-router'
import VueResource  from 'vue-resource'

import App          from './components/App.vue'
import MainContent  from './components/MainContent.vue'
import Login        from './components/Login.vue'
import Signup       from './components/Signup.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

export var router = new VueRouter({
  routes: [
    { path: '/', component: MainContent },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
