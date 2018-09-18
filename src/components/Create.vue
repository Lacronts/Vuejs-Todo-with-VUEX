<template>
  <form v-on:submit.prevent="addTask(newTask)">
    <div class="form-row">
      <div class="form-group col-sm-12">
        <input type="text" ref="new" v-model.trim="newTask.task" class="form-control" placeholder="Что вы хотите сделать?">
        <span v-html="error" class="error"></span>
    </div>
    </div>
  </form>
</template>

<script>
  export default {
    mounted(){
      this.$refs.new.focus()
    },
    data(){
      return {
        newTask: {
          id: '',
          task:'',
          isDone: false,
          isEditing: false,
          time:''
        },
        error:'',

      }
    },
    methods: {
      addTask(task){
        this.newTask.time = this.formatDate().toString()
        if (task.task !== ''){
          this.newTask.id = this.$store.getters.id;
          this.$store.commit('addNew', task)
          this.newTask = {id:'', task:'', isDone:false, isEditing:false}
          this.error = ''
        } else {
          this.error = 'Заполните поле...'
          }
      },
      formatDate(){
        let date = new Date();
        let options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        };
        return date.toLocaleString("ru", options)
      }
    },
  }
</script>

<style>
::-webkit-input-placeholder {
   font-style: italic;
}
.error{
  font-style: italic;
  color: red;
  font-weight: 400;
  font-size: 11pt;
}
</style>
