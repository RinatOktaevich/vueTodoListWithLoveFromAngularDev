<script setup lang="ts">
import type {ITodo} from "@/general/data-model/ITodo";
import {onMounted, type Ref, ref} from "vue";
import {TodoStatus} from "@/general/data-model/TodoStatus";

let props = defineProps<{ item: ITodo }>();

let item: Ref<ITodo> =  ref({
  id:'',
  title:'',
  content:'',
  createdAt:null,
  status:TodoStatus.PENDING
});
let itemEditBuffer: ITodo | null = null;
let isEditing = ref(false);
// let model = defineModel();

onMounted(() => {
  console.log('On Item mounted', props.item )
  item.value = {... props.item};
  itemEditBuffer = {... item.value};
  isEditing.value = item.value.createdAt == null;
  console.log('   local item: ', item.value);
});

const emit = defineEmits<{
  (e: 'on-save', value: ITodo): void;
  (e: 'on-cancel', value: ITodo): void;
}>();

function onSave() {
  emit('on-save', item.value);
  isEditing.value = false;
  itemEditBuffer = {... item.value};
}

function onEdit() {
  itemEditBuffer = {... item.value};
  isEditing.value = true;
}

function onReset() {
  // console.log(itemEditBuffer);
  if(itemEditBuffer) {
    item.value = itemEditBuffer;
  }
  // item.value._isEditing = false;
}

function onCancel(){
  onReset();
  isEditing.value = false;
  emit('on-cancel', item.value);
}

</script>

<template>
  <div v-if="!isEditing">
    <p>{{ item.title }}</p>
    <p>{{ item.content }}</p>
  </div>

  <div v-if="isEditing">
    <div>
      <input type="text" v-model="item.title">
    </div>
    <div>
      <input type="text" v-model="item.content">
    </div>
  </div>

  <button class="edit-btn" v-if="!isEditing" @click="onEdit">Edit</button>
  <button class="cancel-btn" v-if="isEditing" @click="onReset">Reset</button>
  <button class="cancel-btn" v-if="isEditing" @click="onCancel">Cancel</button>

  <button class="save-btn" v-if="isEditing" @click="onSave">Save</button>

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