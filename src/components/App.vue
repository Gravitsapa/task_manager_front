<template>
  <div id="app">
  	<site-head></site-head>
    <main>
    	<router-view></router-view>
    </main>
    <footer>
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

	* {
		box-sizing: border-box;
	}
	
	body {
		background: url(../assets/bg.png) repeat-x;
	}
</style>