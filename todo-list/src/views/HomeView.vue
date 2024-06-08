<script setup lang="ts">

import {onMounted, ref} from "vue";
import type {ITodo} from "@/general/data-model/ITodo";
import {TodoStatus} from "@/general/data-model/TodoStatus";
import TodoList from "@/general/widgets/TodoList.vue";


onMounted(() => {
  console.log('Mounted');
})

const items = ref<ITodo[]>([]);

function onAddItem(){
  console.log('OnAdd Item')

  items.value.push({
    id:Date.now().toString(),
    title:'',
    content:'',
    createdAt:null,
    status:TodoStatus.PENDING,
    _isEditing: true
  })
  console.log('items ', items.value);
}
</script>

<template>
  <main>
    <h1>Todo List</h1>
    <TodoList :items="items"></TodoList>

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
