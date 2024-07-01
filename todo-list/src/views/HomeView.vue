<script setup lang="ts">

import {onMounted, ref} from "vue";
import TodoList from "@/general/widgets/TodoList.vue";
import TodoItemEdit from "@/general/widgets/TodoItemEdit.vue";
import {todoListStore} from "@/general/services/storage.service";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

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
    <header class="page-header">
      <h1>Todo List</h1>

      <button class="add-btn"
              @click="onAddItem"
              title="Add">
        <FontAwesomeIcon class="scale-up-on-hover" :icon="faCircleXmark" transform="rotate-45" size="xl" />
      </button>
    </header>

    <TodoList></TodoList>
    <TodoItemEdit v-if="showAddItem" class="add-todo-item"
        @submit="onEditingSubmit" @cancel="showAddItem=false">
    </TodoItemEdit>



<!--    <button class="cancel-btn"-->
<!--            @click="() => { showAddItem=false }"-->
<!--            v-if="showAddItem"-->
<!--            title="Cancel">-->
<!--      <FontAwesomeIcon :icon="faCircleXmark" class="scale-up-on-hover" size="2xl"/>-->
<!--    </button>-->

  </main>

</template>


<style lang="scss" scoped>
@use '../assets/animations';

.add-todo-item {
  margin-top: 15px;
}

.add-btn {
  padding: 8px 18px;
  border: solid 1px var(--color-border);
  border-radius: var(--border-radius-round);
  @include animations.transition;

  &:hover .fa-circle-xmark {
    @include animations.scale;
  }
}

.page-header {
  display: flex;
  justify-content: space-between;

}

</style>
