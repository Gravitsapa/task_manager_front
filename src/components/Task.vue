<template>
  <div>
    <template v-if="editMode">
      <input type="text" v-model="taskName" @keyup.enter.prevent="editTask()">
    </template>
    <div v-else>
      <input type="checkbox" v-model="taskStatus" @click="editTask">
      <span :class="{ completed: taskStatus }">{{ this.taskName }}</span>
      <span class="handle">m</span>
      <span @click='editMode = true'>e</span>
      <span @click.prevent="$emit('removeTask', this.task)">d</span>
      <label :for="'task_'+taskId" class="deadlineLabel">cki</label>
    </div>

    <datepicker :id="'task_'+taskId"
                input-class="hidden"
                v-model="taskDeadline"
                format="yyyy-MM-dd">
    </datepicker>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'

  export default {
    components: {
      Datepicker
    },
    data: function() {
      return {
        taskId: this.task.id,
        taskName: this.task.name,
        taskStatus: this.task.status,
        taskDeadline: this.task.deadline,
        idProject: this.projectId,
        editMode: false
      }
    },
    methods: {
      editTask() {
        let options = {
          name: this.taskName,
          status: this.taskStatus,
          deadline: this.taskDeadline,
        };
        console.log(this.taskDeadline);//todo delete
        this.$http.patch('http://192.168.100.100:3000/projects/'+this.idProject+'/tasks/'+this.taskId, options).then((response) => {

        }, (response) => {
        console.log('err');

        });
        this.editMode = false;
      }
    },
    watch: {
      taskDeadline() {
        this.editTask();
      }
    },
    props: ['task', 'projectId']
  }
</script>

<style>
  .completed {
    text-decoration: line-through;
  }

  .handle {
    cursor: move;
  }

  .hidden {
    display: none;
  }

</style>