
<script setup lang="ts">
import {onMounted} from "vue";
import type {ITodo} from "@/general/data-model/ITodo";
import TodoItem from "@/general/widgets/TodoItem.vue";

const props = defineProps<{ items: ITodo[]}>();

onMounted(() => {
  console.log('Props: ', props);
})


</script>


<template>
  <div class="list-container">
    <p>Container</p>

    <div v-for="item in props.items">
      <TodoItem :item="item" :key="item.id"></TodoItem>
    </div>

  </div>
</template>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
}
</style>