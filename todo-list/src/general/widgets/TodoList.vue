
<script setup lang="ts">
import {onMounted, ref, type Ref} from "vue";
import type {ITodo} from "@/general/data-model/ITodo";
import TodoItem from "@/general/widgets/TodoItem.vue";
import {todoListStore} from "@/general/services/storage.service";

const todoList = todoListStore();

onMounted(() => {
})

function onSave(event:any){
  console.log('TodoList onSave: ',event )
}

</script>


<template>
  <div class="list-container">

<!--    <div v-for="item in todoList.items">-->
      <TodoItem v-for="item in todoList.items" :item="item" :key="item.id">
      </TodoItem>
<!--    </div>-->

  </div>
</template>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin-top: 20px;
}
</style>