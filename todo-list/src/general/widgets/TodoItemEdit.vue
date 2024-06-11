<style>
.is-invalid {
  background: rgba(255, 0, 0, 0.4);
  border: solid 1px #914b4b;
}
</style>

<template>
  <form @submit.prevent="sumbitForm">
    <div class="form-group">

      <input type="text" v-model="form.title"
             id="title"
             placeholder="Title"
             @blur="validateField('title')"
             :class="{ 'is-invalid': errors.title.required }"
             required>
    </div>
    <div class="form-group">
      <input type="text" v-model="form.content"
             id="content"
             placeholder="Content"
             :class="{ 'is-invalid': errors.content.required }"
             required>
    </div>

    <button type="submit" >Submit</button>

  </form>

</template>


<script setup lang="ts">
import {onMounted, reactive} from "vue";

const emit = defineEmits<{
  (e:'submit',
   form:{
     title: string,
     content: string
   } )
}>();

onMounted(() => { console.log(" Mounted TodoItemEdit ") });

let form = reactive({
  title: '',
  content: ''
});

const errors = reactive({
  title: {required:false},
  content: {required:false}
});

const validateField = (field) => { errors[field].required = form[field].trim() === '' };

function sumbitForm() {
  // console.log("Sumbit form: ", form);
  emit('submit', form);
}
</script>