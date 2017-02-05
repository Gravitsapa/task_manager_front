<template>
	<div>
		<project></project>
		<button v-if="this.showButton" v-on:click="showProjectTitle()">Add project</button>
		<project-head v-else @newProject="addProject"></project-head>
	</div>
</template>

<script>
import Project from './project/Project.vue'
import ProjectHead from './project/ProjectHead.vue'

export default {
	//name: "MainContent",
  components: {
		Project,
		ProjectHead
	},
	data: function() {
		return {
			projects: [],
			showButton: true
		}
	},
	methods: {
		showProjectTitle() {
			this.showButton = false
		},
		addProject(title) {
			//projects.appent title
			console.log(title)
		}
	}
}
</script>