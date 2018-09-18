import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
  },
  getters:{
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
  },
  mutations: {
    addNew(state, payload) {
      state.todos = [...state.todos, payload]
    },
    deleteTask(state, payload){
      state.todos = state.todos.filter((item) => item.id !== payload)
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
      })
    },
    doneTask(state, payload){
      state.todos = state.todos.map((item) => {
        if (item.id === payload.id) {
          item.isDone = payload.checked
        }
        return item
      })
    },
    deleteCompleted(state){
      state.todos = state.todos.filter((item) => item.isDone == false)
    }
  },
})
