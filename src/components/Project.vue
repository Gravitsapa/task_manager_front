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
    add task
  </div>
  <task></task>
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
      id: this.proj.id
    }
  },
  methods: {
    renameProject() {
      var options = {
        name: this.name
      }
      this.$http.patch('http://localhost:3000/projects/'+this.id, options).then((response) => {

      }, (response) => {
        console.log('err');

      });
      this.updateMode = false;
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