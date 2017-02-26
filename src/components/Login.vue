<template>
	<div class="form">
    <form @submit="login">
      <input type="email" v-model="user.email" placeholder="email">
      <input type="password" v-model="user.password" @keyup.enter="login" placeholder="password">
      <button type="button" @click="login">Sign in</button>
    </form>
    <p class="message">Not registered? <router-link to="signup">Create an account</router-link></p>
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

  .form .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
  }

  .form .message a {
    color: #4CAF50;
    text-decoration: none;
  }
</style>