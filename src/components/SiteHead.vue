<template>
	<header class="header">
    <div class="header__loader"></div>
		<nav class="container">
	    <ul class="menu">
        <template v-if="!user.authenticated">
          <li><router-link to="login">Log in</router-link></li>
          <li><router-link to="signup">Register</router-link></li>
        </template>
				<li v-else @click="logout()"><router-link to="login">Logout</router-link></li>
	    </ul>
		</nav>
    <div class="header__logo">
      <div class="header__logo_large">Simple todo lists</div>
      <div class="header__logo_small">from ruby garage</div>
    </div>
	</header>
</template>

<script>
  import {auth} from '../main'
	export default {
    data() {
      return {
        user: auth.user
      }
    },
		methods: {
		  logout() {
		    auth.logout();
      }
    }
	}
</script>

<style>
	header {
		text-align: right;
	}

  .header__loader {
    height: 6px;
    background-color: #333;
  }

	nav li {
		display: inline;
		list-style: none;
	}

  .header__logo {
    text-align: center;
    padding: 30px 0 60px 0;
    text-shadow: #fff 1px 1px 1px;
    text-transform: uppercase;
  }

  .header__logo_large {
    font-size: 26px;
    font-weight: 600;
    margin: 5px 0;
  }

  .header__logo_small {
    font-size: 18px;
    margin: 5px 0;
  }

  .menu li {
    margin-left: 20px;
  }

  .menu li a {
    color: #4972AF;
    font-weight: bold;
    text-decoration: none;
  }
</style>