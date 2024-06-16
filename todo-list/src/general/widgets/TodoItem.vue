<script setup lang="ts">
import type {ITodo} from "@/general/data-model/ITodo";
import {onMounted, type Ref, ref} from "vue";
import {todoListStore} from "@/general/services/storage.service";
import TodoItemEdit from "@/general/widgets/TodoItemEdit.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";

export interface ItemProps {
  item: ITodo //this is like @Input
}

const todoList = todoListStore();

const props = defineProps<ItemProps>();
let todo:Ref<ITodo> = ref({});

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

function onEditingSubmit(form:{  title: string, content: string}) {
  console.log('onEditingSubmit :', form);
  todo.value = {... todo.value, ... form};
  todoList.editItem(todo);
  isEditing.value = false;
}

</script>

<template>
  <div v-if="!isEditing">
    <p>{{ todo?.title }}</p>
    <p>{{ todo?.content }}</p>

    <button class="edit-btn" @click="onEdit"> <EditIcon class="svg-icon edit-icon"></EditIcon></button>
    <button class="edit-btn" @click="onDelete"> <DeleteIcon class="svg-icon delete-icon"></DeleteIcon></button>
  </div>

  <div v-if="isEditing">
    <TodoItemEdit :item="props.item"  @submit="onEditingSubmit"></TodoItemEdit>
    <button class="edit-btn" @click="() => {  isEditing = false }">Cancel</button>
  </div>




  <!--  <button class="cancel-btn" v-if="isEditing" @click="onReset">Reset</button>-->
<!--  <button class="cancel-btn" v-if="isEditing" @click="onCancel">Cancel</button>-->

<!--  <button class="save-btn" v-if="isEditing" @click="onSave">Save</button>-->

</template>

<!-- Parent.vue -->
<!--<Child-->
<!--    :modelValue="foo"-->
<!--    @update:modelValue="$event => (foo = $event)"-->
<!--/>-->

<!--  <input v-model="model" />-->
<!--  <h1 v-if="awesome">Vue is awesome!</h1>-->
<!--  <h1 v-else>Oh no 😢</h1>-->
<style>
/*.edit-btn {
  float: right;

}*/

.edit-icon, .delete-icon {
  height: 24px;
  width: 24px;
}


</style>