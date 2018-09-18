<template>
  <div >
  <ul class="list-group content" v-show="$store.getters.todos.length">
    <li
        v-for="task in todos"
        :class="task.isDone ? 'isDone' : 'activeTask'"
        :key="task.id"
        class="list-group-item"
        >
        <form v-on:submit.prevent="saveChange(task.id)" v-on:dblclick="editTask(task.id)" v-on:keyup.esc="editTask(task.id)">
          <span class="time text-nowrap">Создано: {{task.time}}</span>
            <div class="row">
              <div v-if="task.isEditing" class="col-12">
                <input ref="change" :value="task.task" class="form-control">
              </div>
              <div v-else class="col-10 d-flex align-items-center">
                <span>
                  <input :id="task.id" @click="toogle(task.id, $event)" type="checkbox" :checked="task.isDone">
                  <label :for="task.id"></label>
                </span>
                <span class="ml-2">{{task.task}}</span>
              </div>
              <div v-if="!task.isEditing" class="col-2 d-flex justify-content-end">
                <a href="#" @click="deleteTask(task.id)" class="del my-auto">
                  &times;
                </a>
              </div>
            </div>
        </form>
    </li>
  </ul>
  <div class="row mt-3 col-sm-12" v-show="$store.getters.todos.length">
    <div class="col-md-3">
      <span>Активных: {{$store.getters.active.length}} </span>
    </div>
    <div class="col-md-6 col-sm-12">
      <ul class="nav nav-pills justify-content-center">
        <li class="nav-item">
          <a class="nav-link" :class="activeView==='All' ? 'active': ''" @click="currentView('All')" href="#">Все</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="[activeView==='Active' ? 'active': '', !$store.getters.completed.length ? 'isDisabled' : '']" @click="currentView('Active')" href="#">Активные</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="[activeView==='Completed' ? 'active': '', !$store.getters.completed.length ? 'isDisabled' : '']" @click="currentView('Completed')" href="#">Завершенные</a>
        </li>
      </ul>
    </div>
    <div v-show="$store.getters.completed.length" class="col-md-3 col-sm-12">
      <ul class="nav nav-pills justify-content-center">
        <li class="nav-item">
          <a href="#" @click="deleteCompleted" class="nav-link text-nowrap">Удалить завершенные</a>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data(){
      return{
        activeView:'All',
      }
    },
    computed:{
      todos(){
        switch(this.activeView){
          case 'All':
            return this.$store.getters.todos
          case 'Active':
            return this.$store.getters.active
          case 'Completed':
              return this.$store.getters.completed
        }
      }
    },
    methods:{
      deleteTask(id){
        this.$store.commit('deleteTask', id)
      },
      editTask(id){
        this.$store.commit('editTask', id)
      },
      saveChange(id){
        let value = this.$refs.change[0].value
        this.$store.commit('saveTask', {id:id, task: value})
      },
      toogle(id, event){
       this.$store.commit('doneTask', {id:id, checked: event.target.checked })
      },
      currentView(view){
        this.activeView = view
      },
      deleteCompleted(){
        this.$store.commit('deleteCompleted')
      },
    },
    updated(){
      if (this.$refs.change && this.$refs.change[0]) this.$refs.change[0].focus()
    },
  }
</script>

<style>
  .time{
    width: 17rem;
    height: 100%;
    overflow: hidden;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    font-size: 0.7rem;
    text-decoration: none!important;
  }
  .isDone{
    background-color: rgba(32, 200, 128, .5);
  }
  .isDone span{
    text-decoration: line-through;
  }
  .activeTask{
    background-color: rgba(255, 44, 50, .3);
  }
  .isDisabled{
    opacity: 0.5;
    pointer-events: none;
  }
  .content::after{
    content: '';
    height: 20px;
    margin: -1.25em 0.1em 0 0.1em;
    overflow: hidden;
    box-shadow:0 1px 1px rgba(255, 44, 50, .0),
               0 8px 0 -3px #35D4A0,
               0 9px 1px -3px rgba(255, 44, 50, .3),
               0 16px 0 -6px #FF7373,
               0 17px 2px -6px rgba(32, 200, 128, .5);
  }
  .del{
    user-select: none;
    padding: 0 15px;
    font-size: 2em;
    font-weight: bold;
    color: #FF7373;
  }
  .del:hover{
    color: red;
    text-decoration: none;
  }
  [type="checkbox"]:not(:checked),
  [type="checkbox"]:checked {
    position: absolute;
    left: -9999px;
  }
  [type="checkbox"]:not(:checked) + label,
  [type="checkbox"]:checked + label {
    position: relative;
    padding-left: 2em;
    cursor: pointer;
  }

  /* checkbox aspect */
  [type="checkbox"]:not(:checked) + label:before,
  [type="checkbox"]:checked + label:before {
    content: '';
    position: absolute;
    left: -0.1rem; top: -0.85em;
    width: 2em; height: 2em;
    border: 2px solid #ccc;
    background: #fff;
    border-radius: 50%;
    box-shadow: inset 0 1px 3px rgba(0,0,0,.1);
  }
  /* checked mark aspect */
  [type="checkbox"]:not(:checked) + label:after,
  [type="checkbox"]:checked + label:after {
    content: '✔';
    position: absolute;
    top: -0.3em; left: .15em;
    font-size: 1.4em;
    line-height: 0.8;
    color: #09ad7e;
    transition: all .2s;
  }
  /* checked mark aspect changes */
  [type="checkbox"]:not(:checked) + label:after {
    opacity: 0;
    transform: scale(0);
  }
  [type="checkbox"]:checked + label:after {
    opacity: 1;
    transform: scale(1.1);
  }
  /* disabled checkbox */
  [type="checkbox"]:disabled:not(:checked) + label:before,
  [type="checkbox"]:disabled:checked + label:before {
    box-shadow: none;
    border-color: #bbb;
    background-color: #ddd;
  }
  [type="checkbox"]:disabled:checked + label:after {
    color: #999;
  }
  [type="checkbox"]:disabled + label {
    color: #aaa;
  }
  .nav-link{
    color:grey;
    border: 1px solid grey;
    padding: .2rem .5rem;
  }
  .nav-pills .nav-link.active{
    background: #6c757d;
  }
</style>
