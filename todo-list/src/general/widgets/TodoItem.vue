<style scoped>
label {
  font-size: larger;
}

p {
  padding: 0 12px;
}

.edit-btn {

}

.delete-btn {

}

.item-container {
  border: solid 1px white;
  border-radius: 8px;
  padding: 2px 5px 7px 10px;
}

body.white-theme .item-container {
  border: solid 1px black;
}

</style>


<template>
  <div v-if="!isEditing" class="item-container">
    <label>{{ todo?.title }}</label>
    <p>{{ todo?.content }}</p>

    <button class="edit-btn" @click="onEdit" title="Edit">
      <FontAwesomeIcon :icon="faEdit" class="scale-up-on-hover theme-icon" size="lg"/>
    </button>
    <button class="delete-btn" @click="onDelete" title="Delete">
      <FontAwesomeIcon :icon="faTrashCan" class="scale-up-on-hover" size="lg"/>
    </button>
  </div>

  <div v-if="isEditing" class="item-container">
    <TodoItemEdit :item="props.item" @submit="onEditingSubmit" @cancel="isEditing = false"></TodoItemEdit>

    <!--    <button class="edit-btn" @click="() => {  isEditing = false }"title="Cancel">-->
    <!--      <FontAwesomeIcon :icon="faCircleXmark" class="scale-up-on-hover"/>-->
    <!--    </button>-->
    <!--    <button class="edit-btn" @click="() => {  isEditing = false }">-->
    <!--      <FontAwesomeIcon :icon="faTrashCan" class="scale-up-on-hover"/>-->
    <!--      Cancel</button>-->
  </div>


  <!--  <button class="cancel-btn" v-if="isEditing" @click="onReset">Reset</button>-->
  <!--  <button class="cancel-btn" v-if="isEditing" @click="onCancel">Cancel</button>-->

  <!--  <button class="save-btn" v-if="isEditing" @click="onSave">Save</button>-->

</template>


<script setup lang="ts">
import type {ITodo} from "@/general/data-model/ITodo";
import {onMounted, type Ref, ref} from "vue";
import {todoListStore} from "@/general/services/storage.service";
import TodoItemEdit from "@/general/widgets/TodoItemEdit.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons/faTrashCan";
import {faEdit} from "@fortawesome/free-regular-svg-icons";

export interface ItemProps {
  item: ITodo //this is like @Input
}

const todoList = todoListStore();

const props = defineProps<ItemProps>();
let todo: Ref<ITodo> = ref({});

let isEditing = ref(false);

onMounted(() => {
  console.log('TodoItem mounted item params: ', props.item);
  todo.value = props.item;
});


function onEdit() {
  isEditing.value = true;
}

function onDelete() {
  todoList.deleteItem(todo);
}

function onEditingSubmit(form: { title: string, content: string }) {
  console.log('onEditingSubmit :', form);
  todo.value = {...todo.value, ...form};
  todoList.editItem(todo);
  isEditing.value = false;
}

</script>


<!-- Parent.vue -->
<!--<Child-->
<!--    :modelValue="foo"-->
<!--    @update:modelValue="$event => (foo = $event)"-->
<!--/>-->

<!--  <input v-model="model" />-->
<!--  <h1 v-if="awesome">Vue is awesome!</h1>-->
<!--  <h1 v-else>Oh no 😢</h1>-->
