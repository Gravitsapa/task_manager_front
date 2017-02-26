<template>
	<div class="form">
    <form @submit.prevent="signup">
      <input type="text" v-model="name" placeholder="name">
      <input type="text" v-model="email" placeholder="email">
      <input type="password" v-model="password" placeholder="password">
      <input type="password" v-model="passwordConfirmation" placeholder="password confirmation">
      <button type="submit">Register</button>
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

<style>
  .form {
    position: relative;
    z-index: 1;
    background: #FFFFFF;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }

  .form input {
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .form button {
    text-transform: uppercase;
    outline: 0;
    background: rgb(232, 189, 63);
    width: 100%;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }

  .form button:hover {
    background: rgb(210, 166, 38);
  }

</style>