<template>
<div class="project">
  <div class="project_head">
    <input type="text" v-if="updateMode" v-model="name" @keyup.enter="renameProject">
    <template v-else>
      <div>{{ this.name }}</div>
      <a href="#" @click.prevent="$emit('remove')">delete</a>
      <a href="#" @click.prevent="updateMode = true">update</a>
    </template>
  </div>
  <div class="project_add-task">
    <form @submit.prevent="addTask()">
      <input type="text" v-model="newTask">
      <button type="submit">Add task</button>
    </form>
  </div>
  <task v-for="task in tasks" :task="task" :projectId="id" @removeTask="removeTask(task)"></task>
</div>
</template>

<script>
import Task from './Task.vue'

export default {
  components: {
    Task
  },
  props: ['proj'],
  data: function () {
    return {
      updateMode: false,
      name: this.proj.name,
      id: this.proj.id,
      tasks: this.proj.tasks,
      newTask: ""
    }
  },
  methods: {
    renameProject() {
      var options = {
        name: this.name
      }
      this.$http.patch('http://192.168.100.100:3000/projects/'+this.id, options).then((response) => {

      }, (response) => {
        console.log('err');

      });
      this.updateMode = false;
    },
    addTask() {
      var options = {
        name: this.newTask,
        project_id: this.id
      }

      this.$http.post('http://192.168.100.100:3000/projects/'+this.id+'/tasks', options).then((response) => {
        this.tasks.push(response.body);
      }, (response) => {
        console.log('err');

      });
      this.newTask = ""
    },
    removeTask(task) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
/*      
      this.$http.delete('http://192.168.100.100:3000/projects/'+this.id+'/tasks/'+task.id).then((response) => {
      }, (response) => {
        console.log('err');
      });
*/
    }
  }
}
</script>

<style>
  .project_head {
    height: 52px;
    border: 1px solid #315589;
    background: url(../assets/project-head-bg.png);
  }
</style>