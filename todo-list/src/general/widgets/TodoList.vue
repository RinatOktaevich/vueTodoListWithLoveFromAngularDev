
<script setup lang="ts">
import {onMounted, ref, type Ref} from "vue";
import type {ITodo} from "@/general/data-model/ITodo";
import TodoItem from "@/general/widgets/TodoItem.vue";
import {todoListStore} from "@/general/services/storage.service";

// const props = defineProps<{ items}>();

const todoList = todoListStore();

onMounted(() => {
  // console.log('Props: ', props);
})


// function onCancel(todo:ITodo) {
//   console.log('TodoList onCancel: ',todo )
//   if(todo.createdAt == null) {
//     //delete
//   }
// }

function onSave(event:any){
  console.log('TodoList onSave: ',event )
}

</script>


<template>
  <div class="list-container">

<!--    <div v-for="item in props.items.items">-->
<!--      <TodoItem :item="item" :key="item.id">-->
<!--      </TodoItem>-->
<!--    </div>-->

    <div v-for="item in todoList.items">
      <TodoItem :item="item" :key="item.id">
      </TodoItem>
    </div>

  </div>
</template>

<!--@on-cancel="onCancel"-->
<!--@on-save="onSave"-->

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
}
</style>