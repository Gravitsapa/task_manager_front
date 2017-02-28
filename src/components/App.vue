<template>
  <div id="app">
  	<site-head></site-head>
    <main class="container">
    	<router-view></router-view>
    </main>
    <footer class="container footer">
    	&copy; Andrey Liapin
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

  @media (max-width: 992px) {
    .container {
      width: 80%;
    }
  }

  @media (max-width: 600px) {
    .container {
      width: 95%;
    }
  }

  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  main {
    flex: 1;
  }

  .footer {
    color: #eee;
    max-height: 50px;
    line-height: 50px;
    padding-top: 20px;
    text-align: center;
  }
</style>