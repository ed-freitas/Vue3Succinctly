<script setup>
import { ref } from "vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const docDescription = ref("");
const invalid = ref(false);
const errMsg = ref("");

const today = new Date();
const docDate = ref();
const flow = ref(['year', 'month', 'calendar']);

const tenYears = new Date(today.setFullYear(today.getFullYear() + 10));

const emit = defineEmits(["create-doc"]);

const createDoc = () => {
    invalid.value = false;
    if (docDescription.value != "") {
        emit("create-doc", docDescription.value, docDate.value);
        docDescription.value = "";
        return;
    }
    invalid.value = true;
    errMsg.value = "Document description not provided";
}
</script>

<template>
    <div class="inputdoc" :class="{ 'input-err': invalid }">
        <input
            v-model="docDescription" type="text" />
        <VueDatePicker
            :enable-time-picker="false"
            :min-date="new Date()"
            :max-date=tenYears
            :flow="flow"
            now-button-label="Today" 
            v-model="docDate" 
            />
        <button 
            @click="createDoc">Add
        </button>
    </div>
    <p v-show="invalid" class="err-msg"> {{ errMsg }}</p>
</template>

<style lang="scss" scoped>
.inputdoc {
  display: flex;
  border: 1px solid #d4f4fa;

  &.input-err {
    border-color: red;
  }

  input {
    width: 100%;
    padding: 5px 4px;
    border: none;

    &:focus {
      outline: none;
    }
  }

  button {
    padding: 5px 10px;
    border: none;
  }
}

.err-msg {
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
  color: red;
}
</style>