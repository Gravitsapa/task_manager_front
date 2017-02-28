<template>
  <div class="task">
      <div class="task__checkbox">
        <input type="checkbox" v-model="taskStatus" @click="editTask">
      </div>
      <div class="task__info">
        <template v-if="editMode">
          <div class="task-input-container">
            <input type="text"
                   class="task__input"
                   v-model="taskName"
                   @keyup.enter.prevent="editTask()"
                   v-on-clickaway="editTask"
                   autofocus>
          </div>
        </template>
        <template v-else>
          <span class="task__name" :class="{ completed: taskStatus }">{{ this.taskName }}</span>
          <span class="task__date" v-if="taskDeadline">{{ this.taskDeadline }}</span>
        </template>
      </div>
      <div class="task__actions">
        <a href="#" class="actions-item handle actions__move-task" @click.prevent></a>
        <a href="#" class="actions-item actions__delete-task" @click.prevent="$emit('removeTask', this.task)"></a>
        <a href="#" class="actions-item actions__edit-task" @click.prevent='editMode = true'></a>
        <label class="actions-item deadlineLabel actions__deadline-task" :for="'task_'+taskId"></label>

        <datepicker :id="'task_'+taskId"
                    input-class="hidden"
                    v-model="taskDeadline"
                    format="yyyy-MM-dd">
        </datepicker>
      </div>




  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import { mixin as clickaway } from 'vue-clickaway';
  import {API_URL} from '../main';

  export default {
    components: {
      Datepicker
    },
    mixins: [ clickaway ],
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
        this.$http.patch(API_URL+'projects/'+this.idProject+'/tasks/'+this.taskId, options).then((response) => {

        }, (response) => {
        console.log('err');

        });
        this.editMode = false;
      },
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

  .calendar {
    right: 0;
  }

  .handle {
    cursor: move;
  }

  .hidden {
    display: none;
  }

  .task {
    border-bottom: 1px solid #e7ebea;
    display: table-row;
  }

  .task:hover {
    background-color: #fcfed5;
  }

  .task:last-child {
    border: none;

  }

  .task-input-container {
    margin: 0 15px;
  }

  .task__input {
    width: 100%;
  }

  .task__checkbox {
    border-right: 1px solid #efdadf;
    width: 45px;
    padding: 0 0 0 15px;
    display: table-cell;
    line-height: 50px;
  }

  .task:last-child .task__checkbox {
    border-bottom-left-radius: 12px;
  }

  .task__checkbox:after {
    content: '';
    display: inline-block;
    margin-right: 4px;
    height: 50px;
    float: right;
    border-right: 1px solid #efdadf;
  }

  .task__info {
    display: table-cell;
    vertical-align: middle;
  }

  .task__name {
    color: #999;
    padding: 0 15px;
    font-weight: bold;
  }

  .task__date {
    float: right;
    border-radius: 8px;
    color: white;
    font-weight: normal;
    font-size: .75rem;
    background-color: red;
    padding: 2px 5px;
    margin-right: 15px;
  }

  .task__actions {
    border-left: 1px solid #efdadf;
    display: table-cell;
    width: 112px;
    padding-left: 5px;
    vertical-align: middle;
  }

  .task:last-child .task__actions {
    border-bottom-right-radius: 12px;
  }

  .task:hover .actions-item {
    visibility: visible;
  }

  .actions-item {
    border-left: 1px solid #5284bf;
    display: inline-block;
    visibility: hidden;
    height: 13px;
    padding: 0 9px;
  }

  .actions-item:first-child {
    border-left: none;
  }

  .actions__move-task {
    background: url("../assets/move-small_ico.png") no-repeat 100%;
  }

  .actions__edit-task {
    background: url("../assets/pencil-small_ico.png") no-repeat 100%;
  }

  .actions__deadline-task {
    background: url("../assets/clock-small_ico.png") no-repeat 100%;
    cursor: pointer;
  }

  .actions__delete-task {
    background: url("../assets/trash-small_ico.png") no-repeat 100%;
  }

</style>