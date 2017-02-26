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
             v-on-clickaway="addProject"
             :class="{ 'error': $v.newProject.$error }">
    </div>

  </div>
</template>

<script>
import Project from './Project.vue'
import {router} from '../main'
import {auth} from '../main'
import { mixin as clickaway } from 'vue-clickaway';
import { required } from 'vuelidate/lib/validators'
import {API_URL} from '../main'


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
  validations: {
    newProject: {
      required
    },
  },
  methods: {
    showProjectTitle() {
      this.showButton = false
    },
    deleteProject(id) {

      let removedId = this.projects.splice(id, 1)[0].id;

      this.$http.delete(API_URL+'projects/'+removedId).then((response) => {
      }, (response) => {
        console.log('err');
      });
    },
    addProject() {
      this.$v.newProject.$touch();
      if(!this.$v.newProject.$error) {
        let options = {
          name: this.newProject,
          user_id: auth.user.user_id
        };

        this.$http.post(API_URL+'projects', options).then((response) => {
          this.projects.push(response.body);
          this.showButton = true;
        }, (response) => {
          console.log('err');

        });
        this.newProject = '';
      }
    }
  },
  created() {
    if(!auth.user.authenticated)
      router.replace('/login')
  },
  mounted: function() {
    this.$http.get(API_URL+'projects').then((response) => {
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