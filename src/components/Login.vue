<template>
	<div>
    <form action="" @submit="login">
      <input type="email" v-model="user.email">
      <input type="password" v-model="user.password">
      <button type="button" @click="login">go</button>
    </form>
	</div>
</template>

<script>
  import {auth} from '../main'

  export default {
    data() {
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      login() {
        let user = {
          auth: {
            email: this.user.email,
            password: this.user.password
          }
        };
        auth.login(this, user)
      }
    }
  }
</script>