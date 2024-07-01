<style scoped>
.is-invalid {
  background: rgba(255, 0, 0, 0.4);
  border: solid 1px #914b4b;
}
</style>

<template>
  <form @submit.prevent="emit('submit', form)">
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

    <button type="submit" title="Submit">
      <FontAwesomeIcon :icon="faCircleCheck" class="scale-up-on-hover" size="lg"/>
    </button>

    <button class="edit-btn" @click="() => { emit('cancel') }" title="Cancel">
      <FontAwesomeIcon :icon="faCircleXmark" class="scale-up-on-hover" size="lg"/>
    </button>

  </form>

</template>


<script setup lang="ts">
import {onMounted, reactive} from "vue";
import type {ItemProps} from "@/general/widgets/TodoItem.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-regular-svg-icons";

const props = defineProps<ItemProps>();

const emit = defineEmits<{
  (e:'submit',form:{
     title: string,
     content: string
   } ),
  (e:'cancel')
}>();

onMounted(() => {
  console.log(" Mounted TodoItemEdit ")
  if (props.item) {
    form.title = props.item.title;
    form.content = props.item.content;
  }

});

let form = reactive({
  title: '',
  content: ''
});

const errors = reactive({
  title: {required:false},
  content: {required:false}
});

const validateField = (field) => { errors[field].required = form[field].trim() === '' };

</script>