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
  status:TodoStatus.PENDING,
  _isEditing: true
});
let itemEditBuffer: ITodo | null = null;
// let model = defineModel();

onMounted(() => {
  console.log('On Item mounted', props.item )
  item.value = {... props.item};
  console.log('   local item: ', item.value);
});

const emit = defineEmits<{
  (e: 'on-save', value: ITodo): void;
}>();

function onSave() {
  emit('on-save', item.value);
  item.value._isEditing = false;
}

function onEdit() {
  itemEditBuffer = props.item;
  item.value._isEditing = true;
}

function onCancel() {
  if(itemEditBuffer) {
    item.value = itemEditBuffer;
  }
  item.value._isEditing = false;
}

</script>

<template>
  <div v-if="!item._isEditing">
    <p>{{ item.title }}</p>
    <p>{{ item.content }}</p>
  </div>

  <div v-if="item?._isEditing">
    <div>
      <input type="text" v-model="item.title">
    </div>
    <div>
      <input type="text" v-model="item.content">
    </div>
  </div>

  <button class="edit-btn" v-if="!item?._isEditing" @click="onEdit">Edit</button>
  <button class="cancel-btn" v-if="item?._isEditing" @click="onCancel">Cancel</button>
  <button class="save-btn" v-if="item?._isEditing" @click="onSave">Save</button>


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