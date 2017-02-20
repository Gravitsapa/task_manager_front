<template>
  <div>
    <project
      v-for="(project, index) in projects" 
      :proj="project" 
      @remove="deleteProject(index)"
      :key="project.id">
    </project>
    <button v-if="this.showButton" v-on:click="showProjectTitle()">Add project</button>
    <input type="text" v-else @keyup.enter="addProject($event.target.value)">
  </div>
</template>

<script>
import Project from './Project.vue'
import {router} from '../main'
import {auth} from '../main'

export default {
  //name: "MainContent",
  components: {
    Project,
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
    deleteProject(id) {

      let removedId = this.projects.splice(id, 1)[0].id;

      this.$http.delete('http://192.168.100.100:3000/projects/'+removedId).then((response) => {
      }, (response) => {
        console.log('err');
      });
    },
    addProject(title) {
      let options = {
        name: title,
        user_id: auth.user.user_id
      };

      this.$http.post('http://192.168.100.100:3000/projects', options).then((response) => {
        this.projects.push(response.body);
        this.showButton = true;
      }, (response) => {
        console.log('err');

      });
    }
  },
  created() {
    if(!auth.user.authenticated)
      router.replace('/login')
  },
  mounted: function() {
    this.$http.get('http://192.168.100.100:3000/projects').then((response) => {
      this.projects = (response.body);
    }, (response) => {
      console.log('err');
    });
  }
}
</script>