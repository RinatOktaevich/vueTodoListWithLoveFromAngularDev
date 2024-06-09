
<script setup lang="ts">
import {onMounted, ref, type Ref} from "vue";
import type {ITodo} from "@/general/data-model/ITodo";
import TodoItem from "@/general/widgets/TodoItem.vue";

const props = defineProps<{ items: ITodo[]}>();

onMounted(() => {
  console.log('Props: ', props);
})


function onCancel(todo:ITodo) {
  console.log('TodoList onCancel: ',todo )
  if(todo.createdAt == null) {
    //delete
  }
}

function onSave(event:any){
  console.log('TodoList onSave: ',event )
}

</script>


<template>
  <div class="list-container">
    <p>Container</p>

    <div v-for="item in props.items">
      <TodoItem :item="item" :key="item.id"
                @on-cancel="onCancel"
                @on-save="onSave">
      </TodoItem>
    </div>

  </div>
</template>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
}
</style>