import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let apiLocalStorage = {
  initialState: function(){
    return JSON.parse(localStorage.tasks || '[]');
  },
  saveState: function(tasks){
    localStorage.tasks = JSON.stringify(tasks)
  },
};

const state = {
  todos: apiLocalStorage.initialState(),
};

const getters = {
  todos: state => {
    return state.todos
  },
  completed: state => {
    return state.todos.filter((item) => item.isDone)
  },
  active: state => {
    return state.todos.filter((item) => !item.isDone)
  },
  id: state => {
    let id = state.todos.reduce((acc, item) => {
      if (acc < item.id) return item.id
      else return acc
    },-1)
    return ++id
  },
};

const mutations = {
  addNew(state, payload) {
    state.todos = [...state.todos, payload];
    apiLocalStorage.saveState(state.todos)
  },
  deleteTask(state, payload){
    state.todos = state.todos.filter((item) => item.id !== payload)
    apiLocalStorage.saveState(state.todos)
  },
  editTask(state, payload){
    state.todos = state.todos.map((item) => {
      if (item.id === payload) item.isEditing = !item.isEditing
      else item.isEditing = false
      return item
    })
  },
  saveTask(state, payload){
    state.todos = state.todos.map((item) => {
      if (item.id === payload.id) {
        item.isEditing = false
        item.task = payload.task
      }
      return item
    });
    apiLocalStorage.saveState(state.todos);
  },
  doneTask(state, payload){
    state.todos = state.todos.map((item) => {
      if (item.id === payload.id) {
        item.isDone = payload.checked
      }
      return item
    });
    apiLocalStorage.saveState(state.todos);
  },
  deleteCompleted(state){
    state.todos = state.todos.filter((item) => item.isDone == false);
    apiLocalStorage.saveState(state.todos);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
})
