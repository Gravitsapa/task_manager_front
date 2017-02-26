<template>
<div class="project">
  <div class="project__head">
    <div v-if="updateMode" class="project-input-container">
      <input type="text"
             v-model="name"
             @keyup.enter="renameProject"
             class="project__input"
             v-on-clickaway="renameProject"
             autofocus>
    </div>
    <template v-else>
      <span class="project__title">{{ this.name }}</span>
      <span class="actions">
        <a href="#" class="actions__item actions__remove-project" @click.prevent="$emit('remove')"></a>
        <a href="#" class="actions__item actions__edit-project" @click.prevent="updateMode = true"></a>
      </span>
    </template>
  </div>
  <div class="project__add-task">
    <form @submit.prevent="addTask()" class="add-task">
      <div class="add-task__item">
        <input type="text"
               v-model="newTask"
               class="add-task__input"
               placeholder="Start typing here to create a task...">
      </div>
      <div class="add-task__item"><button type="submit" class="add-task__button">Add task</button></div>

    </form>
  </div>
  <div class="project__tasks">
    <draggable :list="tasks" :options="{handle: '.handle'}" @update="moveTask()" class="tasks">
      <task v-for="task in tasks"
            :key="task.id"
            :task="task"
            :projectId="id"
            @removeTask="removeTask(task)">
      </task>
    </draggable>
  </div>

</div>
</template>

<script>
import Task from './Task.vue'
import draggable from 'vuedraggable'
import { mixin as clickaway } from 'vue-clickaway';
import {API_URL} from '../main'

export default {
  components: {
    Task,
    draggable
  },
  mixins: [ clickaway ],
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
  computed: {
    tasksPriority() {
      let tasks = [];
      this.tasks.forEach(function (item, i, arr) {
        tasks.push(item.id);
      });
      return {
        tasks: tasks,
        project_id: this.id
      }
    }
  },
  methods: {
    renameProject() {
      let options = {
        name: this.name
      };
      this.$http.patch(API_URL+'projects/'+this.id, options).then((response) => {

      }, (response) => {
        console.log('err');

      });
      this.updateMode = false;
    },
    addTask() {
      let options = {
        name: this.newTask,
        status: false,
        priority: 0,
        project_id: this.id
      };

      this.$http.post(API_URL+'projects/'+this.id+'/tasks', options).then((response) => {
        this.tasks.push(response.body);
      }, (response) => {
        console.log('err');

      });
      this.newTask = ""
    },
    removeTask(task) {
      this.tasks.splice(this.tasks.indexOf(task), 1);

      this.$http.delete(API_URL+'projects/'+this.id+'/tasks/'+task.id).then((response) => {
      }, (response) => {
        console.log('err');
      });

    },
    moveTask() {

      this.$http.post(API_URL+'projects/'+this.id+'/tasks/sort', this.tasksPriority).then((response) => {

      }, (response) => {
        console.log('err');

      });
    }
  }
}
</script>

<style>
  .project {
    margin-bottom: 40px;
  }

  .project__head {
    height: 52px;
    border: 1px solid #315589;
    background: url(../assets/calendar_ico.png) no-repeat 15px 50%, #4972af url(../assets/project-head-bg.png);
    position: relative;
  }

  .project-input-container{
    margin-left: 50px;
    margin-right: 15px;
  }
  .project__input {
    height: 30px;
    margin-top: 10px;
    border: solid 2px #315589;
    transition: border 0.3s;
    border-radius: 4px;
    background: none;
    color: #fff;
    font-size: 1.1rem;
    padding-left: 15px;
    width: 100%;
  }
  .project__input:focus, .project__input.focus {
    border: solid 2px #3754c0;
  }

  .project__title {
    line-height: 52px;
    margin-left: 50px;
    color: #fff;
    font-size: 1.1rem;
    text-shadow: #333 0 1px 0;
  }

  .actions {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    height: 100%;
    align-items: center;
    margin-right: 5px;
  }

  .project__head:hover .actions {
    display: inline-flex;
  }

  .actions__item {
    border-left: 1px solid #5284bf;
    display: inline-block;
    height: 16px;
    padding: 0 20px;
  }

  .actions__item:first-child {
    border-left: none;
  }

  .actions__remove-project {
    background: url("../assets/trash_ico.png") no-repeat 50% 50%;
  }

  .actions__edit-project {
    background: url("../assets/pencil_ico.png") no-repeat 50% 50%;
  }

  .project__add-task {
    height: 50px;
    background: url(../assets/add_task_ico.png) no-repeat 15px 50%, -webkit-linear-gradient(top, #e1e1e1 0%, #ccc 100%);
    background: url(../assets/add_task_ico.png) no-repeat 15px 50%, -moz-linear-gradient(top, #e1e1e1 0%, #ccc 100%);
    background: url(../assets/add_task_ico.png) no-repeat 15px 50%, -ms-linear-gradient(top, #e1e1e1 0%, #ccc 100%);
    background: url(../assets/add_task_ico.png) no-repeat 15px 50%, linear-gradient(top, #e1e1e1 0%, #ccc 100%);
    border: 1px solid #aaa;
    border-top: none;
  }

  .add-task {
    margin: 0 15px 0 50px;
    display: table;
    height: 100%;

  }

  .add-task__item {
    display: table-cell;
    vertical-align: middle;
    width: 100%;
  }

  .add-task__button {
    background: -webkit-linear-gradient(top, #94cbae 0%, #508767 100%);
    background:    -moz-linear-gradient(top, #94cbae 0%, #508767 100%);
    background:     -ms-linear-gradient(top, #94cbae 0%, #508767 100%);
    background:         linear-gradient(top, #94cbae 0%, #508767 100%);
    border: 1px solid #447557;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    cursor: pointer;
    color: #fff;
    font-size: .8rem;
    font-weight: 600;
    height: 28px;
    padding: 0 20px;
    text-shadow: #333 0 1px 0;
    white-space: nowrap;
  }

  .add-task__input {
    border: none;
    border-top: 1px solid #707070;
    border-left: 1px solid #cfcfcf;
    height: 28px;
    padding-left: 15px;
    width: 100%;
    box-shadow: inset  0  2px 1px -1px #cfcfcf;
  }

  .project__tasks {
    border: 1px solid #aaa;
    border-bottom: 2px solid #aaa;
    border-top: none;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }

  .tasks {
    background-color: #fff;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    display: table;
    border-collapse: collapse;
    width: 100%;
  }
</style>