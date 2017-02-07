<template>
  <div>
    <project
      v-for="project in projects" 
      :proj="project" 
      @delProject="deleteProj">
    </project>
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
    deleteProj(id) {
//      for (var i = this.projects.length - 1; i >= 0; i--) {
//        if (this.projects[i].id == id) {
//          console.log(i)
//          this.projects.splice(i, 1);
//          return;
//        };
      };
      this.$http.delete('http://localhost:3000/projects/'+id).then((response) => {
      }, (response) => {
        console.log('err');
      });

    },
    addProject(title) {
      var options = {
        name: title
      }

      this.$http.post('http://localhost:3000/projects', options).then((response) => {
        this.projects.push(response.body);
      }, (response) => {
        console.log('err');

      });

      this.showButton = true
    }
  },
  created: function() {
    this.$http.get('http://localhost:3000/projects').then((response) => {
        this.projects = (response.body);
      }, (response) => {
        console.log('err');

      });
  }
}
</script>