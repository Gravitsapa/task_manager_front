<template>
  <div>
    <template v-if="editMode">
      <input type="text" v-model="taskName" @keyup.enter.prevent="editTask()">
    </template>
    <div v-else>
      <input type="checkbox" v-model="taskStatus" @click="editTask">
      <span :class="{ completed: taskStatus }">{{ this.taskName }}</span>
      <button class="handle">m</button>
      <button @click='editMode = true'>e</button>
      <button @click.prevent="$emit('removeTask', this.task)">d</button>
    </div>

  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        taskId: this.task.id,
        taskName: this.task.name,
        taskStatus: this.task.status,
        idProject: this.projectId,
        editMode: false
      }
    },
    methods: {
      editTask() {
        let options = {
          name: this.taskName,
          status: this.taskStatus,
          id: this.taskId
        };
        this.$http.patch('http://192.168.100.100:3000/projects/'+this.idProject+'/tasks/'+this.taskId, options).then((response) => {

        }, (response) => {
        console.log('err');

        });
        this.editMode = false;
      }
    },
    props: ['task', 'projectId']
  }
</script>

<style>
  .completed {
    text-decoration: line-through;
  }
</style>