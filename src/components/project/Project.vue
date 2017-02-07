<template>
<div>
	<project-head :name="project.name" :id="project.id" @delProject="deleteProject"></project-head>
	<add-task></add-task>
	<task></task>
</div>
	
</template>

<script>
import ProjectHead from './ProjectHead.vue'
import AddTask from './AddTask.vue'
import Task from './Task.vue'

export default {
  components: {
		ProjectHead,
		AddTask,
		Task
	},
	props: ['proj'],
	data: function () {
	  return { project: this.proj }
	},
	methods: {
		deleteProject(id) {
      this.$emit('delProject', id)
    }
	}
}

</script>