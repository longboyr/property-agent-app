<!-- src/components/AgentForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="flex flex-column gap-3">
    <div class="field">
      <label for="firstName" class="font-bold">First Name</label>
      <InputText
        id="firstName"
        v-model="formData.firstName"
        :class="{ 'p-invalid': v$.firstName.$error }"
        aria-describedby="firstName-help"
        placeholder="Enter first name"
      />
      <small v-if="v$.firstName.$error" id="firstName-help" class="p-error">{{
        v$.firstName.$errors[0].$message
      }}</small>
    </div>

    <div class="field">
      <label for="lastName" class="font-bold">Last Name</label>
      <InputText
        id="lastName"
        v-model="formData.lastName"
        :class="{ 'p-invalid': v$.lastName.$error }"
        aria-describedby="lastName-help"
        placeholder="Enter last name"
      />
      <small v-if="v$.lastName.$error" id="lastName-help" class="p-error">{{
        v$.lastName.$errors[0].$message
      }}</small>
    </div>

    <div class="field">
      <label for="email" class="font-bold">Email</label>
      <InputText
        id="email"
        v-model="formData.email"
        :class="{ 'p-invalid': v$.email.$error }"
        aria-describedby="email-help"
        placeholder="Enter email address"
      />
      <small v-if="v$.email.$error" id="email-help" class="p-error">{{
        v$.email.$errors[0].$message
      }}</small>
    </div>

    <div class="field">
      <label for="mobileNumber" class="font-bold">Mobile Number</label>
      <InputText
        id="mobileNumber"
        v-model="formData.mobileNumber"
        :class="{ 'p-invalid': v$.mobileNumber.$error }"
        aria-describedby="mobileNumber-help"
        placeholder="Enter mobile number"
      />
      <small v-if="v$.mobileNumber.$error" id="mobileNumber-help" class="p-error">{{
        v$.mobileNumber.$errors[0].$message
      }}</small>
    </div>

    <div class="flex justify-content-between mt-4">
      <Button
        type="button"
        label="Clear"
        class="p-button-outlined p-button-secondary"
        icon="pi pi-times"
        @click="resetForm"
      />
      <Button
        type="submit"
        label="Save"
        icon="pi pi-check"
        :loading="loading"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import type { PropertyAgent, CreateAgentDTO } from "../types";
import { useAgentStore } from "../stores/agentStore";

const props = defineProps<{
  agent: PropertyAgent | null;
}>();

const emit = defineEmits<{
  (e: "submit", data: CreateAgentDTO): void;
  (e: "reset"): void;
}>();

const agentStore = useAgentStore();
const loading = computed(() => agentStore.loading);

const formData = reactive<CreateAgentDTO>({
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
});

const rules = {
  firstName: { required },
  lastName: { required },
  email: { required, email },
  mobileNumber: { required },
};

const v$ = useVuelidate(rules, formData);

// Watch for changes to the agent prop and update the form
watch(
  () => props.agent,
  (newAgent) => {
    if (newAgent) {
      formData.firstName = newAgent.firstName;
      formData.lastName = newAgent.lastName;
      formData.email = newAgent.email;
      formData.mobileNumber = newAgent.mobileNumber;
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

async function handleSubmit() {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  emit("submit", { ...formData });
}

function resetForm() {
  v$.value.$reset();
  formData.firstName = "";
  formData.lastName = "";
  formData.email = "";
  formData.mobileNumber = "";
  emit("reset");
}
</script>

<style scoped>
.field {
  margin-bottom: 1rem;
}

.p-button {
  min-width: 6rem;
}
</style>
