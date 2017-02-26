<template>
	<div class="form">
    <form @submit.prevent="signup">
      <input type="text" v-model="user.name" placeholder="name" :class="{ 'error': $v.user.name.$error }">
      <input type="text" v-model="user.email" placeholder="email" :class="{ 'error': $v.user.email.$error }">
      <input type="password" v-model="user.password" placeholder="password" :class="{ 'error': $v.user.password.$error }">
      <input type="password"
             v-model="user.passwordConfirmation"
             placeholder="password confirmation"
             :class="{ 'error': $v.user.passwordConfirmation.$error }">
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
  import {auth} from '../main'
  import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'


  export default {
    data() {
      return {
        user: {
          name: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }
      }
    },
    validations: {
      user: {
        name: {
          required
        },
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(5)
        },
        passwordConfirmation: {
          required,
          minLength: minLength(5),
          sameAsPassword: sameAs('password')
        },
      }
    },
    methods: {
      signup() {
        this.$v.user.$touch();
        if(!this.$v.user.$error) {
          let credentials = {
            name: this.user.name,
            email: this.user.email,
            password: this.user.password,
            password_confirmation: this.user.passwordConfirmation,
          };
          auth.signup(this, credentials, '/')
        }
      }
    }
  }
</script>
