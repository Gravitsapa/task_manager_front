<template>
  <div class="project_head">
    <template v-if="this.title">
      <div class="title" >{{ this.title }}</div>
      <a href="#" @click.prevent="deleteProject()">delete</a>
    </template>
    <input type="text" v-else @keyup.enter="createProject($event.target.value)">
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        title: this.name || "",
        idProject: this.id || ""
      }
    },
    methods: {
      createProject(title) {
        this.$emit('newProject', title)
      },
      deleteProject(id) {
        this.$emit('delProject', this.idProject)
      }
    },
    props: ['name', 'id'],
  }
</script>

<style>
  .project_head {
    height: 52px;
    border: 1px solid #315589;
    background: url(../../assets/project-head-bg.png) #4473b4;
  }
</style>