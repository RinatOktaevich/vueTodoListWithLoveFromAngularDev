<script setup lang="ts">

import {onMounted, ref} from "vue";
import TodoList from "@/general/widgets/TodoList.vue";
import TodoItemEdit from "@/general/widgets/TodoItemEdit.vue";
import {todoListStore} from "@/general/services/storage.service";

const todoStore = todoListStore();

onMounted(() => {
  console.log('Mounted');
  todoStore.getStorage();

})

// const items = ref<ITodo[]>([]);
let showAddItem = ref(false);

function onAddItem(){

  console.log('OnAdd Item')
  showAddItem.value = true;

}

function onEditingSubmit(form:{  title: string, content: string}) {
  console.log('HomeView onEditingSubmit :', form);
  todoStore.addItem(form);
  showAddItem.value = false;
}

</script>

<template>
  <main>
    <h1>Todo List</h1>
    <TodoList></TodoList>
    <TodoItemEdit v-if="showAddItem"
        @submit="onEditingSubmit">
    </TodoItemEdit>

    <button @click="onAddItem" class="add-btn">
      Add
    </button>
  </main>

</template>


<style scoped>
.add-btn {
  float: right;
}

</style>
