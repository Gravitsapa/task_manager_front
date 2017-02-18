<template>
	<div>
    <form action="">
      <input type="text" v-model="user.email">
      <input type="text" v-model="user.password">
      <input type="button" value="go" @click="login">
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