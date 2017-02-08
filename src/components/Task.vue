<template>
	<div>
		{{ this.singleTask.id }}
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				singleTask: this.task
			}
		},
		props: ['task']
	}
</script>