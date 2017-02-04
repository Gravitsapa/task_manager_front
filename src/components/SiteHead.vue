<template>
	<header>
		<nav>
	    <ul>
				<li><router-link to="login">Login</router-link></li>
				<li><router-link to="signup">Signup</router-link></li>
				<li><router-link to="login">Logout</router-link></li>
	    </ul>
		</nav>
	</header>
</template>

<script>
	export default {
		
	}
</script>

<style>
	header {
		background-color: red;
		text-align: right;
	}
</style>