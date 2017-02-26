<template>
  <div>
    <project
      v-for="(project, index) in projects" 
      :proj="project" 
      @remove="deleteProject(index)"
      :key="project.id">
    </project>
    <div class="new-project">
      <button v-if="this.showButton" class="new-project__button" v-on:click="showProjectTitle()">Add project</button>
      <input type="text"
             v-else
             v-model="newProject"
             @keyup.enter="addProject"
             class="new-project__input"
             autofocus
             placeholder="Enter project title..."
             v-on-clickaway="addProject">
    </div>

  </div>
</template>

<script>
import Project from './Project.vue'
import {router} from '../main'
import {auth} from '../main'
import { mixin as clickaway } from 'vue-clickaway';


export default {
  //name: "MainContent",
  components: {
    Project,
  },
  mixins: [ clickaway ],
  data: function() {
    return {
      projects: [],
      newProject: '',
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
    addProject() {
      let options = {
        name: this.newProject,
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

<style>

  .new-project {
    text-align: center;
  }

  .new-project__button {
    background: url(../assets/add_project_ico.png) no-repeat 15px 50%,#4972AF url(../assets/project-head-bg.png) repeat-x;
    border: 1px solid #315589;
    border-radius: 2px;
    display: inline-block;
    font-weight: bold;
    height: 50px;
    line-height: 50px;
    padding: 0 35px 0 50px;
    color: #fff;
    text-shadow: #333 0 1px 0;
    text-decoration: none;
  }

  .new-project__input {
    background: #4972AF url(../assets/project-head-bg.png) repeat-x;
    border: 1px solid #315589;


    font-weight: bold;
    height: 50px;
    width: 100%;
    line-height: 50px;
    padding: 0 35px 0 50px;
    color: #fff;
    text-shadow: #333 0 1px 0;
  }
</style>