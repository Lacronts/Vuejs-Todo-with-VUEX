<template>
  <div class="container">
    <h2 class="text-center title">Vue Todos with VUEX</h2>
    <Create></Create>
      <List></List>
  </div>
</template>

<script>
  import List from './components/ListToDo.vue'
  import Create from './components/Create.vue'

  export default{
    components:{
      List,
      Create,
    }
  }
</script>

<style>
  body{
    background-color:rgba(0, 0, 0, 0.1);
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  }
</style>
