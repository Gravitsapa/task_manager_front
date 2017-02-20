<template>
<div class="project">
  <div class="project__head">
    <input type="text" v-if="updateMode" v-model="name" @keyup.enter="renameProject">
    <template v-else>
      <span class="project__title">{{ this.name }}</span>
      <span class="actions">
        <a href="#" class="actions__item actions__remove-project" @click.prevent="$emit('remove')"></a>
        <a href="#" class="actions__item actions__edit-project" @click.prevent="updateMode = true"></a>
      </span>
    </template>
  </div>
  <div class="project_add-task">
    <form @submit.prevent="addTask()">
      <input type="text" v-model="newTask">
      <button type="submit">Add task</button>
    </form>
  </div>
  <draggable :list="tasks" :options="{handle: '.handle'}" @update="moveTask()">
    <task v-for="task in tasks"
          :key="task.id" 
          :task="task" 
          :projectId="id"
          @removeTask="removeTask(task)">
    </task>
  </draggable>
</div>
</template>

<script>
import Task from './Task.vue'
import draggable from 'vuedraggable'

export default {

  components: {
    Task,
    draggable
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
      this.$http.patch('http://192.168.100.100:3000/projects/'+this.id, options).then((response) => {

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

      this.$http.post('http://192.168.100.100:3000/projects/'+this.id+'/tasks', options).then((response) => {
        this.tasks.push(response.body);
      }, (response) => {
        console.log('err');

      });
      this.newTask = ""
    },
    removeTask(task) {
      this.tasks.splice(this.tasks.indexOf(task), 1);

      this.$http.delete('http://192.168.100.100:3000/projects/'+this.id+'/tasks/'+task.id).then((response) => {
      }, (response) => {
        console.log('err');
      });

    },
    moveTask() {

      this.$http.post('http://192.168.100.100:3000/projects/'+this.id+'/tasks/sort', this.tasksPriority).then((response) => {

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
</style>