<template>
	<div class="project_head">
		<div class="title" v-if="this.title">{{ this.title }}</div>
		<input type="text" v-else @keyup.enter="createProject($event.target.value)">
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				title: ""
			}
		},
		methods: {
			createProject(title) {
				this.$emit('newProject', title)
				this.title = title;////todo render project component
			}
		}
	}
</script>

<style>
	.project_head {
		height: 52px;
		border: 1px solid #315589;
		background: url(../../assets/project-head-bg.png) #4473b4;
	}
</style>