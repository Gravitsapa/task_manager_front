<template>
	<header>
		<nav>
	    <ul>
				<li><router-link to="/">Home</router-link></li>
				<li><router-link to="login">Login</router-link></li>
				<li><router-link to="signup">Signup</router-link></li>
				<li @click="logout()"><router-link to="login">Logout</router-link></li>
	    </ul>
		</nav>
	</header>
</template>

<script>
  import {auth} from '../main'
	export default {
		methods: {
		  logout() {
		    auth.logout();
      }
    }
	}
</script>

<style>
	header {
		background-color: red;
		text-align: right;
	}

	nav li {
		display: inline;
		list-style: none;
	}
</style>