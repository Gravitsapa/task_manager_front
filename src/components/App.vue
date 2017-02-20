<template>
  <div id="app">
  	<site-head></site-head>
    <main class="container">
    	<router-view></router-view>
    </main>
    <footer class="container">
    	Ruby Garage
    </footer>
  </div>
</template>

<script>

import SiteHead from './SiteHead.vue'

export default {
  name: 'app',
  components: {
    SiteHead,
  }
}
</script>


<style>
  @import "../assets/normalize.css";

	* {
		box-sizing: border-box;
	}
	
	body {
    background: #AB510B url(../assets/bg.png) repeat-x fixed;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .container {
    width: 65%;
    margin: 0 auto;
  }
</style>