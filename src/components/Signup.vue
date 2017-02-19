<template>
	<div>
    <form @submit.prevent="signup">
      <input type="text" v-model="name" placeholder="name">
      <input type="text" v-model="email" placeholder="email">
      <input type="password" v-model="password" placeholder="password">
      <input type="password" v-model="passwordConfirmation" placeholder="password confirmation">
      <button type="submit">signup</button>
    </form>
  </div>
</template>

<script>
  import {auth} from '../main'

  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }
    },
    methods: {
      signup() {
        let credentials = {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        };
        auth.signup(this, credentials, '/')
      }
    }
  }
</script>