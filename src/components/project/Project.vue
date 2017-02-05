<template>
<div>
	<project-head></project-head>
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
		}
}
</script>