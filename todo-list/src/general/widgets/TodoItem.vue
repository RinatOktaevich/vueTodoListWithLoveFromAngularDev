<script setup lang="ts">
import type {ITodo} from "@/general/data-model/ITodo";
import {onMounted, ref} from "vue";

export interface ItemProps {
  item: ITodo //this is like @Input
}

const props = defineProps<ItemProps>();

// let item: Ref<ITodo> =  ref({
//   id:'',
//   title:'',
//   content:'',
//   createdAt:null,
//   status:TodoStatus.PENDING
// });
// let itemEditBuffer: ITodo | null = null;
let isEditing = ref(false);
// let item= ref();

onMounted(() => {
  console.log('TodoItem mounted item params: ', props.item);
  // item = props.item.item;
  // item.value = {... unref(props.item) };

});

// const emit = defineEmits<{
//   (e: 'on-save', value: ITodo): void;
//   (e: 'on-cancel', value: ITodo): void;
// }>();

// function onSave() {
//   // emit('on-save', item.value);
//   isEditing.value = false;
// }

function onEdit() {
  isEditing.value = true;
}

// function onReset() {
//   // if(itemEditBuffer) {
//   //   item.value = itemEditBuffer;
//   // }
// }

// function onCancel(){
//   onReset();
//   isEditing.value = false;
//   emit('on-cancel', item.value);
// }

function onEditingSubmit(form:{  title: string, content: string}) {
  console.log('onEditingSubmit :', form);
}

</script>

<template>
<!--  <div v-if="!isEditing">-->
    <p>{{ item?.title }}</p>
    <p>{{ item?.content }}</p>
<!--  </div>-->

<!--  <div v-if="isEditing">-->
<!--    <TodoItemEdit @submit="onEditingSubmit"></TodoItemEdit>-->
<!--  </div>-->

  <button class="edit-btn" v-if="!isEditing" @click="onEdit">Edit</button>
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
</style>